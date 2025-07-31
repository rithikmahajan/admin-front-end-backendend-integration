import React, { useState } from 'react';
import { ChevronDown, Plus, Edit, Trash2 } from 'lucide-react';

const ProductBundling = () => {
  const [mainProduct, setMainProduct] = useState({
    category: '',
    subcategory: '',
    item: ''
  });

  const [bundleItems, setBundleItems] = useState([
    { id: 1, category: '', subcategory: '', item: '' },
    { id: 2, category: '', subcategory: '', item: '' }
  ]);

  // Sample product data
  const sampleProduct = {
    image: '/api/placeholder/158/167',
    productName: 'T shirt',
    category: 'T shirt', 
    subcategories: 'small',
    variants: [
      { size: 'small', quantity: 5, price: '4566', salePrice: '4566', sku: 'blk/m/inso123', barcode: '45600000000000' },
      { size: 'small', quantity: 5, price: '4566', salePrice: '4566', sku: 'blk/m/inso123', barcode: '45600000000000' },
      { size: 'small', quantity: 5, price: '4566', salePrice: '4566', sku: 'blk/m/inso123', barcode: '45600000000000' }
    ]
  };

  const handleMainProductChange = (field, value) => {
    setMainProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBundleItemChange = (id, field, value) => {
    setBundleItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
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
  const ProductSection = ({ title, isMain = false, onAssignItem }) => (
    <div className="mb-12">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-black text-left mb-6 font-montserrat">{title}</h2>
      
      {/* Dropdowns Row */}
      <div className="flex gap-6 mb-6">
        <CustomDropdown 
          placeholder="Category"
          value=""
          onChange={() => {}}
          options={[
            { value: 't-shirt', label: 'T-shirt' },
            { value: 'pants', label: 'Pants' }
          ]}
        />
        <CustomDropdown 
          placeholder="sub category"
          value=""
          onChange={() => {}}
          options={[
            { value: 'casual', label: 'Casual' },
            { value: 'formal', label: 'Formal' }
          ]}
        />
        <div className="flex gap-4 items-center">
          <CustomDropdown 
            placeholder="Item"
            value=""
            onChange={() => {}}
            options={[
              { value: 'blue-tshirt', label: 'Blue T-shirt' },
              { value: 'red-tshirt', label: 'Red T-shirt' }
            ]}
          />
          {onAssignItem && (
            <button 
              onClick={onAssignItem}
              className="bg-[#202224] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#333537] transition-colors font-montserrat text-[14px] border border-[#7280FF] shadow-sm"
            >
              <Plus size={20} />
              Assign Item
            </button>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="w-[158px] h-[167px] flex-shrink-0">
          <img 
            src={sampleProduct.image} 
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
              <div>T shirt</div>
              <div>T shirt</div>
              <div className="text-[14px]">small</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          {/* Product Variants */}
          {sampleProduct.variants.map((variant, index) => (
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

      {/* Bundle With Button for Main Product */}
      {isMain && (
        <div className="mt-8">
          <button className="bg-[#202224] text-white px-[51px] py-4 rounded-full text-[16px] font-medium hover:bg-[#333537] transition-colors font-montserrat border border-black">
            Bundle with
          </button>
        </div>
      )}
    </div>
  );

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
        />

        {/* Bundle Items */}
        {bundleItems.map((item, index) => (
          <ProductSection 
            key={item.id}
            title={`Item ${index + 1}`} 
            onAssignItem={() => console.log(`Assign item to bundle item ${index + 1}`)}
          />
        ))}

        {/* Bundle Preview Section */}
        <div className="mt-16 mb-8">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-[21px] font-bold text-[#111111] font-montserrat">Bundle Preview and arrange</h2>
          <div className="w-5 h-5 bg-[#E5E7EB] rounded flex items-center justify-center">
            <svg className="w-3 h-3 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          </div>
        </div>

        {/* Bundle Preview Grid */}
        <div className="space-y-12">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-12">
            {['main', 'item 1', 'Item 2'].map((title, index) => (
              <div key={`row1-${index}`} className="text-center">
                <h3 className="text-2xl font-bold text-black mb-6 font-montserrat capitalize">{title}</h3>
                <div className="w-[253px] h-[250px] bg-[#F3F4F6] rounded-lg mb-6 mx-auto overflow-hidden">
                  <img 
                    src={sampleProduct.image} 
                    alt={title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 text-[15px] font-montserrat text-left max-w-[253px] mx-auto">
                  <div><span className="text-black font-normal">Product Name:</span> <span className="font-medium text-[#111111] ml-1">T shirt</span></div>
                  <div><span className="text-black font-normal">Category:</span> <span className="font-medium text-[#111111] ml-1">T shirt</span></div>
                  <div><span className="text-black font-normal">sub categories:</span> <span className="font-medium text-black text-[14px] ml-1">small</span></div>
                </div>
                {index === 2 && (
                  <div className="flex justify-center gap-1 mt-4">
                    <button className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                      <Edit size={16} className="text-[#667085]" />
                    </button> 
                    <button className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                      <Trash2 size={16} className="text-[#667085]" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-3 gap-12">
            {['main', 'item 1', 'Item 2'].map((title, index) => (
              <div key={`row2-${index}`} className="text-center">
                <h3 className="text-2xl font-bold text-black mb-6 font-montserrat capitalize">{title}</h3>
                <div className="w-[253px] h-[250px] bg-[#F3F4F6] rounded-lg mb-6 mx-auto overflow-hidden">
                  <img 
                    src={sampleProduct.image} 
                    alt={title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 text-[15px] font-montserrat text-left max-w-[253px] mx-auto">
                  <div><span className="text-black font-normal">Product Name:</span> <span className="font-medium text-[#111111] ml-1">T shirt</span></div>
                  <div><span className="text-black font-normal">Category:</span> <span className="font-medium text-[#111111] ml-1">T shirt</span></div>
                  <div><span className="text-black font-normal">sub categories:</span> <span className="font-medium text-black text-[14px] ml-1">small</span></div>
                </div>
                {index === 2 && (
                  <div className="flex justify-center gap-1 mt-4">
                    <button className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                      <Edit size={16} className="text-[#667085]" />
                    </button>
                    <button className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                      <Trash2 size={16} className="text-[#667085]" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-3 gap-12">
            {['main', 'item 1', 'Item 2'].map((title, index) => (
              <div key={`row3-${index}`} className="text-center">
                <h3 className="text-2xl font-bold text-black mb-6 font-montserrat capitalize">{title}</h3>
                <div className="w-[253px] h-[250px] bg-[#F3F4F6] rounded-lg mb-6 mx-auto overflow-hidden">
                  <img 
                    src={sampleProduct.image} 
                    alt={title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 text-[15px] font-montserrat text-left max-w-[253px] mx-auto">
                  <div><span className="text-black font-normal">Product Name:</span> <span className="font-medium text-[#111111] ml-1">T shirt</span></div>
                  <div><span className="text-black font-normal">Category:</span> <span className="font-medium text-[#111111] ml-1">T shirt</span></div>
                  <div><span className="text-black font-normal">sub categories:</span> <span className="font-medium text-black text-[14px] ml-1">small</span></div>
                </div>
                {index === 2 && (
                  <div className="flex justify-center gap-1 mt-4">
                    <button className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                      <Edit size={16} className="text-[#667085]" />
                    </button>
                    <button className="p-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                      <Trash2 size={16} className="text-[#667085]" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bundle List Button */}
          <div className="flex justify-center mt-12 pt-4">
            <button className="bg-[#202224] text-white px-[51px] py-4 rounded-full text-[16px] font-medium hover:bg-[#333537] transition-colors font-montserrat border border-black">
              Bundle list
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBundling;
