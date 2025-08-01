import React, { useState } from 'react';
import { ChevronDown, Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ProductBundling = () => {
  const [mainProduct, setMainProduct] = useState({
    id: 'main',
    category: '',
    subcategory: '',
    item: '',
    productData: null
  });

  const [bundleItems, setBundleItems] = useState([
    { id: 'item1', category: '', subcategory: '', item: '', productData: null },
    { id: 'item2', category: '', subcategory: '', item: '', productData: null }
  ]);

  const [bundleList, setBundleList] = useState([]);
  const [dragItems, setDragItems] = useState([]);

  // Sample database of products
  const productDatabase = {
    't-shirt': {
      'casual': [
        {
          id: 'blue-tshirt',
          name: 'Blue T-shirt',
          image: '/api/placeholder/158/167',
          category: 'T shirt',
          subcategory: 'casual',
          variants: [
            { size: 'small', quantity: 5, price: '4566', salePrice: '4566', sku: 'blk/m/inso123', barcode: '45600000000000' },
            { size: 'medium', quantity: 3, price: '4566', salePrice: '4566', sku: 'blk/m/inso124', barcode: '45600000000001' },
            { size: 'large', quantity: 8, price: '4566', salePrice: '4566', sku: 'blk/m/inso125', barcode: '45600000000002' }
          ]
        },
        {
          id: 'red-tshirt',
          name: 'Red T-shirt',
          image: '/api/placeholder/158/167',
          category: 'T shirt',
          subcategory: 'casual',
          variants: [
            { size: 'small', quantity: 7, price: '4566', salePrice: '4566', sku: 'red/m/inso123', barcode: '45600000000003' },
            { size: 'medium', quantity: 5, price: '4566', salePrice: '4566', sku: 'red/m/inso124', barcode: '45600000000004' }
          ]
        }
      ],
      'formal': [
        {
          id: 'white-formal-shirt',
          name: 'White Formal Shirt',
          image: '/api/placeholder/158/167',
          category: 'T shirt',
          subcategory: 'formal',
          variants: [
            { size: 'small', quantity: 4, price: '5566', salePrice: '5566', sku: 'wht/m/frm123', barcode: '45600000000005' }
          ]
        }
      ]
    },
    'pants': {
      'casual': [
        {
          id: 'blue-jeans',
          name: 'Blue Jeans',
          image: '/api/placeholder/158/167',
          category: 'Pants',
          subcategory: 'casual',
          variants: [
            { size: '30', quantity: 6, price: '6566', salePrice: '6566', sku: 'blu/jns/30', barcode: '45600000000006' }
          ]
        }
      ],
      'formal': [
        {
          id: 'black-trousers',
          name: 'Black Trousers',
          image: '/api/placeholder/158/167',
          category: 'Pants',
          subcategory: 'formal',
          variants: [
            { size: '32', quantity: 3, price: '7566', salePrice: '7566', sku: 'blk/trs/32', barcode: '45600000000007' }
          ]
        }
      ]
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleMainProductChange = (field, value) => {
    setMainProduct(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'category' && { subcategory: '', item: '', productData: null }),
      ...(field === 'subcategory' && { item: '', productData: null })
    }));
  };

  const handleBundleItemChange = (id, field, value) => {
    setBundleItems(prev => 
      prev.map(item => 
        item.id === id ? { 
          ...item, 
          [field]: value,
          ...(field === 'category' && { subcategory: '', item: '', productData: null }),
          ...(field === 'subcategory' && { item: '', productData: null })
        } : item
      )
    );
  };

  const getSubcategories = (category) => {
    if (!category || !productDatabase[category]) return [];
    return Object.keys(productDatabase[category]).map(sub => ({
      value: sub,
      label: sub.charAt(0).toUpperCase() + sub.slice(1)
    }));
  };

  const getItems = (category, subcategory) => {
    if (!category || !subcategory || !productDatabase[category]?.[subcategory]) return [];
    return productDatabase[category][subcategory].map(item => ({
      value: item.id,
      label: item.name
    }));
  };

  const getProductData = (category, subcategory, itemId) => {
    if (!category || !subcategory || !itemId || !productDatabase[category]?.[subcategory]) return null;
    return productDatabase[category][subcategory].find(item => item.id === itemId);
  };

  const handleAssignItem = (type) => {
    if (type === 'main') {
      const productData = getProductData(mainProduct.category, mainProduct.subcategory, mainProduct.item);
      if (productData) {
        setMainProduct(prev => ({ ...prev, productData }));
        updateDragItems({ ...mainProduct, productData }, 'main');
      }
    } else {
      const item = bundleItems.find(item => item.id === type);
      const productData = getProductData(item.category, item.subcategory, item.item);
      if (productData) {
        setBundleItems(prev => 
          prev.map(bundleItem => 
            bundleItem.id === type ? { ...bundleItem, productData } : bundleItem
          )
        );
        updateDragItems({ ...item, productData }, type);
      }
    }
  };

  const updateDragItems = (itemData, type) => {
    setDragItems(prev => {
      const existing = prev.find(item => item.id === type);
      if (existing) {
        return prev.map(item => item.id === type ? { ...itemData, id: type } : item);
      } else {
        return [...prev, { ...itemData, id: type }];
      }
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setDragItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleBundleWith = () => {
    const currentBundle = {
      id: Date.now(),
      main: mainProduct.productData,
      items: bundleItems.filter(item => item.productData).map(item => item.productData),
      arrangement: dragItems
    };
    
    if (currentBundle.main && currentBundle.items.length > 0) {
      setBundleList(prev => [...prev, currentBundle]);
      
      // Reset form
      setMainProduct({ id: 'main', category: '', subcategory: '', item: '', productData: null });
      setBundleItems([
        { id: 'item1', category: '', subcategory: '', item: '', productData: null },
        { id: 'item2', category: '', subcategory: '', item: '', productData: null }
      ]);
      setDragItems([]);
    }
  };

  const removeBundleItem = (bundleId, itemType, itemIndex) => {
    if (itemType === 'main') {
      setBundleList(prev => prev.filter(bundle => bundle.id !== bundleId));
    } else {
      setBundleList(prev => 
        prev.map(bundle => 
          bundle.id === bundleId 
            ? { ...bundle, items: bundle.items.filter((_, index) => index !== itemIndex) }
            : bundle
        ).filter(bundle => bundle.items.length > 0)
      );
    }
  };

  // Sortable Item Component for drag and drop
  const SortableItem = ({ id, children }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes}>
        <div className="relative group">
          <div
            {...listeners}
            className="absolute top-2 left-2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <GripVertical size={20} className="text-gray-400" />
          </div>
          {children}
        </div>
      </div>
    );
  };

  // Dropdown component
  const CustomDropdown = ({ placeholder, value, onChange, options = [] }) => (
    <div className="relative w-80 h-12">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full px-4 border border-[#979797] rounded-xl text-[#000000] text-[15px] font-montserrat appearance-none bg-white focus:outline-none focus:border-[#979797] hover:border-[#666666] transition-colors"
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#979797] pointer-events-none" />
    </div>
  );

  // Product section component  
  const ProductSection = ({ title, isMain = false, itemData, onCategoryChange, onSubcategoryChange, onItemChange, onAssignItem }) => {
    const categories = [
      { value: 't-shirt', label: 'T-shirt' },
      { value: 'pants', label: 'Pants' }
    ];

    const subcategories = getSubcategories(itemData.category);
    const items = getItems(itemData.category, itemData.subcategory);

    return (
      <div className="mb-12">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-black text-left mb-6 font-montserrat">{title}</h2>
        
        {/* Dropdowns Row */}
        <div className="flex gap-6 mb-6">
          <CustomDropdown 
            placeholder="Category"
            value={itemData.category}
            onChange={onCategoryChange}
            options={categories}
          />
          <CustomDropdown 
            placeholder="sub category"
            value={itemData.subcategory}
            onChange={onSubcategoryChange}
            options={subcategories}
          />
          <div className="flex gap-4 items-center">
            <CustomDropdown 
              placeholder="Item"
              value={itemData.item}
              onChange={onItemChange}
              options={items}
            />
            <button 
              onClick={onAssignItem}
              disabled={!itemData.category || !itemData.subcategory || !itemData.item}
              className="bg-[#202224] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#333537] transition-colors font-montserrat text-[14px] border border-[#7280FF] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={20} />
              Assign Item
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        {itemData.productData && (
          <div className="flex gap-6">
            {/* Product Image */}
            <div className="w-[158px] h-[167px] flex-shrink-0">
              <img 
                src={itemData.productData.image} 
                alt="Product" 
                className="w-full h-full object-cover rounded-lg border border-gray-200"
              />
            </div>

            {/* Product Details Table */}
            <div className="flex-1">
              {/* Table Headers */}
              <div className="grid grid-cols-10 gap-3 mb-3 text-[15px] text-black font-montserrat font-normal">
                <div className="text-left">Image</div>
                <div className="text-left">Product Name</div>
                <div className="text-left">Category</div>
                <div className="text-left">sub categories</div>
                <div className="text-left">size</div>
                <div className="text-left">quantity</div>
                <div className="text-left">Price</div>
                <div className="text-left">sale price</div>
                <div className="text-left">SKU</div>
                <div className="text-left">barcode no.</div>
              </div>

              {/* Product Info Row */}
              <div className="mb-3">
                <div className="grid grid-cols-10 gap-3 text-[15px] font-medium text-[#111111] font-montserrat">
                  <div></div>
                  <div>{itemData.productData.name}</div>
                  <div>{itemData.productData.category}</div>
                  <div className="text-[14px]">{itemData.productData.subcategory}</div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>

              {/* Product Variants */}
              {itemData.productData.variants.map((variant, index) => (
                <div key={index} className="grid grid-cols-10 gap-3 text-[11px] text-[#111111] mb-1 font-montserrat font-medium">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div className="text-[14px]">{variant.size}</div>
                  <div className="text-[14px]">{variant.quantity}</div>
                  <div className="text-[11px]">{variant.price}</div>
                  <div className="text-[11px]">{variant.salePrice}</div>
                  <div className="text-[11px]">{variant.sku}</div>
                  <div className="text-[11px]">{variant.barcode}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bundle With Button for Main Product */}
        {isMain && itemData.productData && (
          <div className="mt-8">
            <button 
              onClick={handleBundleWith}
              className="bg-[#202224] text-white px-[51px] py-4 rounded-full text-[16px] font-medium hover:bg-[#333537] transition-colors font-montserrat border border-black"
            >
              Bundle with
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen font-montserrat">
      <div className="max-w-[1800px] ml-6 px-6 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-black font-montserrat tracking-[-0.6px]">manage product bundling</h1>
        </div>

        {/* Main Product Section */}
        <ProductSection 
          title="Main" 
          isMain={true}
          itemData={mainProduct}
          onCategoryChange={(value) => handleMainProductChange('category', value)}
          onSubcategoryChange={(value) => handleMainProductChange('subcategory', value)}
          onItemChange={(value) => handleMainProductChange('item', value)}
          onAssignItem={() => handleAssignItem('main')}
        />

        {/* Bundle Items */}
        {bundleItems.map((item, index) => (
          <ProductSection 
            key={item.id}
            title={`Item ${index + 1}`} 
            itemData={item}
            onCategoryChange={(value) => handleBundleItemChange(item.id, 'category', value)}
            onSubcategoryChange={(value) => handleBundleItemChange(item.id, 'subcategory', value)}
            onItemChange={(value) => handleBundleItemChange(item.id, 'item', value)}
            onAssignItem={() => handleAssignItem(item.id)}
          />
        ))}

        {/* Bundle Preview Section with Drag and Drop */}
        {dragItems.length > 0 && (
          <div className="mt-16 mb-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-[21px] font-bold text-[#111111] font-montserrat">Bundle Preview and arrange</h2>
              <div className="w-5 h-5 bg-[#E5E7EB] rounded flex items-center justify-center">
                <svg className="w-3 h-3 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                </svg>
              </div>
            </div>

            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={dragItems.map(item => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid grid-cols-3 gap-12">
                  {dragItems.map((item, index) => (
                    <SortableItem key={item.id} id={item.id}>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-black mb-6 font-montserrat capitalize">
                          {item.id === 'main' ? 'main' : item.id === 'item1' ? 'Item 1' : 'Item 2'}
                        </h3>
                        <div className="w-[253px] h-[250px] bg-[#F3F4F6] rounded-lg mb-6 mx-auto overflow-hidden">
                          <img 
                            src={item.productData?.image || '/api/placeholder/253/250'} 
                            alt={item.id} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-1 text-[15px] font-montserrat text-left max-w-[253px] mx-auto">
                          <div><span className="text-black font-normal">Product Name:</span> <span className="font-medium text-[#111111] ml-1">{item.productData?.name || 'T shirt'}</span></div>
                          <div><span className="text-black font-normal">Category:</span> <span className="font-medium text-[#111111] ml-1">{item.productData?.category || 'T shirt'}</span></div>
                          <div><span className="text-black font-normal">sub categories:</span> <span className="font-medium text-black text-[14px] ml-1">{item.productData?.subcategory || 'small'}</span></div>
                        </div>
                        {item.id !== 'main' && (
                          <div className="flex justify-center gap-1 mt-4">
                            <button className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                              <Edit size={16} className="text-[#667085]" />
                            </button> 
                            <button 
                              onClick={() => {
                                setDragItems(prev => prev.filter(dragItem => dragItem.id !== item.id));
                                if (item.id === 'item1') {
                                  setBundleItems(prev => prev.map(bundleItem => 
                                    bundleItem.id === 'item1' ? { ...bundleItem, productData: null } : bundleItem
                                  ));
                                } else if (item.id === 'item2') {
                                  setBundleItems(prev => prev.map(bundleItem => 
                                    bundleItem.id === 'item2' ? { ...bundleItem, productData: null } : bundleItem
                                  ));
                                }
                              }}
                              className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <Trash2 size={16} className="text-[#667085]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}

        {/* Bundle List Section */}
        {bundleList.length > 0 && (
          <div className="mt-16 mb-8">
            <h2 className="text-[21px] font-bold text-[#111111] font-montserrat mb-8">Bundle List</h2>
            
            <div className="space-y-8">
              {bundleList.map((bundle, bundleIndex) => (
                <div key={bundle.id} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 font-montserrat">Bundle {bundleIndex + 1}</h3>
                  
                  <div className="grid grid-cols-4 gap-6">
                    {/* Main Product */}
                    <div className="text-center">
                      <h4 className="text-md font-medium text-black mb-4 font-montserrat">Main</h4>
                      <div className="w-[180px] h-[180px] bg-[#F3F4F6] rounded-lg mb-4 mx-auto overflow-hidden">
                        <img 
                          src={bundle.main?.image || '/api/placeholder/180/180'} 
                          alt="Main product" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1 text-[13px] font-montserrat text-left">
                        <div><span className="text-black font-normal">Product:</span> <span className="font-medium text-[#111111] ml-1">{bundle.main?.name}</span></div>
                        <div><span className="text-black font-normal">Category:</span> <span className="font-medium text-[#111111] ml-1">{bundle.main?.category}</span></div>
                      </div>
                      <button 
                        onClick={() => removeBundleItem(bundle.id, 'main')}
                        className="mt-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Trash2 size={14} className="text-[#667085]" />
                      </button>
                    </div>

                    {/* Bundle Items */}
                    {bundle.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-center">
                        <h4 className="text-md font-medium text-black mb-4 font-montserrat">Item {itemIndex + 1}</h4>
                        <div className="w-[180px] h-[180px] bg-[#F3F4F6] rounded-lg mb-4 mx-auto overflow-hidden">
                          <img 
                            src={item?.image || '/api/placeholder/180/180'} 
                            alt={`Item ${itemIndex + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-1 text-[13px] font-montserrat text-left">
                          <div><span className="text-black font-normal">Product:</span> <span className="font-medium text-[#111111] ml-1">{item?.name}</span></div>
                          <div><span className="text-black font-normal">Category:</span> <span className="font-medium text-[#111111] ml-1">{item?.category}</span></div>
                        </div>
                        <button 
                          onClick={() => removeBundleItem(bundle.id, 'item', itemIndex)}
                          className="mt-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Trash2 size={14} className="text-[#667085]" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductBundling;
