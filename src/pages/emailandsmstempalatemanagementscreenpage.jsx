import React, { useState, useCallback, memo, useMemo, useRef } from 'react';
import { Plus, Upload, X, Edit2, Trash2, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, Type, Palette, Save, Send } from 'lucide-react';

/**
 * Email and SMS Template Management Screen
 * Based on Figma design: https://www.figma.com/design/IpSbkzNdQaSYHeyCNBefrh/YORAA--rithik-mahajan-final-screens-with-try-on--Copy-?node-id=8451-63907&t=bFpoF1lZLkWiW3wy-4
 * 
 * Features:
 * - Create email templates with drag-and-drop functionality  
 * - Real-time editing with basic and advanced tools
 * - Image upload and text input with rearrangement
 * - Template saving and management
 * - Red "send now" action buttons for settings/view mode
 * - Responsive design with Montserrat font following design system
 */

// Constants
const DEFAULT_TEMPLATE = {
  id: null,
  name: '',
  content: {
    images: [],
    texts: [],
    layout: 'default'
  },
  preview: '',
  createdAt: new Date(),
  updatedAt: new Date()
};

const SAMPLE_TEMPLATES = [
  {
    id: 1,
    name: 'Promotional Offer',
    content: {
      backgroundColor: '#000000',
      texts: [
        { id: 'text1', content: 'WANT', fontSize: '12px', color: '#ffffff', position: { x: 50, y: 20 } },
        { id: 'text2', content: '10% OFF', fontSize: '64px', color: '#ffffff', position: { x: 50, y: 40 } },
        { id: 'text3', content: 'YOUR NEXT PURCHASE?', fontSize: '20px', color: '#ffffff', position: { x: 50, y: 60 } },
        { id: 'text4', content: 'PLUS REWARD GIVEAWAY AND MORE!', fontSize: '12px', color: '#ffffff', position: { x: 50, y: 75 } },
        { id: 'text5', content: 'What are you waiting for?', fontSize: '12px', color: '#ffffff', position: { x: 50, y: 85 } },
        { id: 'text6', content: 'Become a Rewards member today!', fontSize: '12px', color: '#ffffff', position: { x: 50, y: 92 } }
      ],
      images: []
    },
    preview: '#000000',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: 'Concert Giveaway',
    content: {
      backgroundColor: '#fffb25',
      texts: [
        { id: 'text1', content: 'Expires in 8 days', fontSize: '12px', color: '#000000', position: { x: 50, y: 10 } },
        { id: 'text2', content: 'YORAA Concert Giveaways', fontSize: '14px', color: '#000000', position: { x: 50, y: 25 } },
        { id: 'text3', content: 'MEMBERS EXCLUSIVE', fontSize: '12px', color: '#000000', position: { x: 50, y: 85 } }
      ],
      images: []
    },
    preview: '#fffb25',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12')
  }
];

const BASIC_TOOLS = [
  { id: 'bold', icon: Bold, label: 'Bold' },
  { id: 'italic', icon: Italic, label: 'Italic' },
  { id: 'underline', icon: Underline, label: 'Underline' },
  { id: 'align-left', icon: AlignLeft, label: 'Align Left' },
  { id: 'align-center', icon: AlignCenter, label: 'Align Center' },
  { id: 'align-right', icon: AlignRight, label: 'Align Right' }
];

const ADVANCED_TOOLS = [
  { id: 'text-color', icon: Palette, label: 'Text Color' },
  { id: 'background-color', icon: Palette, label: 'Background Color' },
  { id: 'font-size', icon: Type, label: 'Font Size' },
  { id: 'font-family', icon: Type, label: 'Font Family' }
];

// Custom Hooks
const useTemplateEditor = () => {
  const [currentTemplate, setCurrentTemplate] = useState(DEFAULT_TEMPLATE);
  const [savedTemplates, setSavedTemplates] = useState(SAMPLE_TEMPLATES);
  const [isEditing, setIsEditing] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  const updateTemplate = useCallback((updates) => {
    setCurrentTemplate(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date()
    }));
  }, []);

  const addText = useCallback((text) => {
    const newText = {
      id: `text_${Date.now()}`,
      content: text,
      fontSize: '16px',
      color: '#000000',
      position: { x: 50, y: 50 },
      style: {
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        textAlign: 'left'
      }
    };

    updateTemplate({
      content: {
        ...currentTemplate.content,
        texts: [...(currentTemplate.content.texts || []), newText]
      }
    });
  }, [currentTemplate.content, updateTemplate]);

  const addImage = useCallback((imageFile) => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newImage = {
        id: `image_${Date.now()}`,
        src: e.target.result,
        position: { x: 20, y: 20 },
        size: { width: 100, height: 100 }
      };

      updateTemplate({
        content: {
          ...currentTemplate.content,
          images: [...(currentTemplate.content.images || []), newImage]
        }
      });
    };
    reader.readAsDataURL(imageFile);
  }, [currentTemplate.content, updateTemplate]);

  const saveTemplate = useCallback(() => {
    if (!currentTemplate.name.trim()) {
      alert('Please enter a template name');
      return;
    }

    const templateToSave = {
      ...currentTemplate,
      id: currentTemplate.id || Date.now(),
      updatedAt: new Date()
    };

    setSavedTemplates(prev => {
      const existingIndex = prev.findIndex(t => t.id === templateToSave.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = templateToSave;
        return updated;
      }
      return [...prev, templateToSave];
    });

    alert('Template saved successfully!');
    setIsEditing(false);
  }, [currentTemplate]);

  const deleteTemplate = useCallback((templateId) => {
    setSavedTemplates(prev => prev.filter(t => t.id !== templateId));
  }, []);

  const editTemplate = useCallback((template) => {
    setCurrentTemplate(template);
    setIsEditing(true);
  }, []);

  return {
    currentTemplate,
    setCurrentTemplate,
    savedTemplates,
    isEditing,
    setIsEditing,
    draggedElement,
    setDraggedElement,
    selectedElement,
    setSelectedElement,
    updateTemplate,
    addText,
    addImage,
    saveTemplate,
    deleteTemplate,
    editTemplate
  };
};

const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e, element) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const handleMouseMove = useCallback((e, onPositionChange) => {
    if (!isDragging) return;

    const container = e.currentTarget.closest('.template-preview');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const x = ((e.clientX - containerRect.left - dragOffset.x) / containerRect.width) * 100;
    const y = ((e.clientY - containerRect.top - dragOffset.y) / containerRect.height) * 100;

    onPositionChange({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };
};

// Components
const ImageUploadSection = memo(({ onImageUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-[24px] font-bold text-[#000000] font-['Montserrat'] text-center leading-[22px]">
        Add image
      </h3>
      
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 h-[594px] w-[296px] flex flex-col items-center justify-center">
        <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
          <ImageIcon className="h-16 w-16 text-gray-400" />
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <button
          onClick={triggerFileInput}
          className="bg-[#000aff] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-[14px] font-['Montserrat'] hover:bg-blue-700 transition-colors shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#7280ff]"
        >
          <Plus className="w-5 h-5" />
          upload image
        </button>
      </div>
    </div>
  );
});

ImageUploadSection.displayName = 'ImageUploadSection';

const TextInputSection = memo(({ onTextAdd }) => {
  const [inputText, setInputText] = useState('');

  const handleAddText = useCallback(() => {
    if (inputText.trim()) {
      onTextAdd(inputText);
      setInputText('');
    }
  }, [inputText, onTextAdd]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleAddText();
    }
  }, [handleAddText]);

  return (
    <div className="space-y-4">
      <h3 className="text-[24px] font-bold text-[#000000] font-['Montserrat'] text-center leading-[22px]">
        Input Text
      </h3>
      
      <div className="border-2 border-solid border-gray-300 rounded-xl p-4 h-[594px] w-[296px]">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your text here..."
          className="w-full h-full border-none outline-none resize-none font-['Montserrat'] text-[14px] bg-transparent"
        />
      </div>
    </div>
  );
});

TextInputSection.displayName = 'TextInputSection';

const TemplatePreview = memo(({ template, onElementSelect, selectedElement, onPositionUpdate }) => {
  const { handleMouseDown, handleMouseMove, handleMouseUp } = useDragAndDrop();

  const updateElementPosition = useCallback((elementId, newPosition) => {
    onPositionUpdate(elementId, newPosition);
  }, [onPositionUpdate]);

  return (
    <div className="space-y-4">
      <h3 className="text-[24px] font-bold text-[#010101] font-['Montserrat'] leading-[1.2]">
        create an email template
      </h3>
      
      <div 
        className="template-preview relative bg-black h-[594px] w-[374px] overflow-hidden cursor-crosshair"
        style={{ backgroundColor: template.content?.backgroundColor || '#000000' }}
        onMouseMove={(e) => handleMouseMove(e, (pos) => {
          if (selectedElement) {
            updateElementPosition(selectedElement.id, pos);
          }
        })}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Render Images */}
        {template.content?.images?.map((image) => (
          <div
            key={image.id}
            className={`absolute cursor-move ${selectedElement?.id === image.id ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              left: `${image.position.x}%`,
              top: `${image.position.y}%`,
              width: `${image.size.width}px`,
              height: `${image.size.height}px`
            }}
            onMouseDown={(e) => {
              onElementSelect(image);
              handleMouseDown(e, image);
            }}
          >
            <img
              src={image.src}
              alt="Template"
              className="w-full h-full object-cover rounded"
              draggable={false}
            />
          </div>
        ))}

        {/* Render Texts */}
        {template.content?.texts?.map((text) => (
          <div
            key={text.id}
            className={`absolute cursor-move ${selectedElement?.id === text.id ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              left: `${text.position.x}%`,
              top: `${text.position.y}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: text.fontSize,
              color: text.color,
              fontWeight: text.style?.fontWeight || 'normal',
              fontStyle: text.style?.fontStyle || 'normal',
              textDecoration: text.style?.textDecoration || 'none',
              textAlign: text.style?.textAlign || 'left',
              fontFamily: 'Montserrat, sans-serif'
            }}
            onMouseDown={(e) => {
              onElementSelect(text);
              handleMouseDown(e, text);
            }}
          >
            {text.content}
          </div>
        ))}

        {/* Default template content if no custom content */}
        {(!template.content?.texts?.length && !template.content?.images?.length) && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-center font-['Montserrat'] leading-none">
            <div className="tracking-[-0.3px]">
              <p className="text-[12px] mb-0 block">WANT</p>
              <p className="text-[64px] mb-0 block font-bold">10% OFF</p>
              <p className="text-[20px] mb-0 block">YOUR NEXT PURCHASE?</p>
              <p className="text-[12px] mb-0 block">PLUS REWARD GIVEAWAY AND MORE!</p>
              <p className="text-[12px] mb-0 block">&nbsp;</p>
              <p className="text-[12px] mb-0 block">What are you waiting for?</p>
              <p className="text-[12px] block">Become a Rewards member today!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

TemplatePreview.displayName = 'TemplatePreview';

const BasicEditingTools = memo(({ onToolApply, selectedElement }) => {
  const handleToolClick = useCallback((toolId) => {
    if (!selectedElement) return;
    onToolApply(toolId, selectedElement.id);
  }, [onToolApply, selectedElement]);

  return (
    <div className="bg-white border border-black rounded-[100px] px-12 py-4 w-[1042px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
      <h4 className="text-[24px] font-bold text-[#010101] font-['Montserrat'] mb-4 text-center leading-[1.2]">
        editing tools
      </h4>
      <div className="flex items-center justify-center gap-4">
        <span className="text-[16px] font-medium text-[#000000] font-['Montserrat'] leading-[1.2]">
          place basic editing tools in here
        </span>
        <div className="flex gap-2 ml-4">
          {BASIC_TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title={tool.label}
              disabled={!selectedElement}
            >
              <tool.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

BasicEditingTools.displayName = 'BasicEditingTools';

const AdvancedEditingTools = memo(({ onToolApply, selectedElement }) => {
  const handleToolClick = useCallback((toolId) => {
    if (!selectedElement) return;
    onToolApply(toolId, selectedElement.id);
  }, [onToolApply, selectedElement]);

  return (
    <div className="absolute right-0 top-[142px] transform rotate-90 origin-center">
      <div className="bg-white border border-black rounded-[100px] px-12 py-4 w-[602px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
        <div className="flex items-center justify-center gap-4">
          <span className="text-[16px] font-medium text-[#000000] font-['Montserrat'] leading-[1.2]">
            place advanced editing tools in here
          </span>
          <div className="flex gap-2 ml-4">
            {ADVANCED_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title={tool.label}
                disabled={!selectedElement}
              >
                <tool.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

AdvancedEditingTools.displayName = 'AdvancedEditingTools';

const SavedTemplatesSection = memo(({ templates, onEdit, onDelete, onSend }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[24px] font-bold text-[#010101] font-['Montserrat'] leading-[1.2]">
            saved templates
          </h3>
          <p className="text-[24px] font-bold text-[#010101] font-['Montserrat'] leading-[1.2]">
            templates {templates.length}
          </p>
        </div>
        <h4 className="text-[24px] font-bold text-[#010101] font-['Montserrat'] leading-[1.2]">
          action
        </h4>
      </div>

      <div className="space-y-8">
        {templates.map((template) => (
          <div key={template.id} className="flex items-center gap-8">
            {/* Template Preview */}
            <div 
              className="w-[374px] h-[594px] overflow-hidden"
              style={{ backgroundColor: template.content?.backgroundColor || '#000000' }}
            >
              <div className="relative h-full">
                {template.content?.texts?.map((text) => (
                  <div
                    key={text.id}
                    className="absolute font-['Montserrat'] leading-none tracking-[-0.3px]"
                    style={{
                      left: `${text.position.x}%`,
                      top: `${text.position.y}%`,
                      transform: 'translate(-50%, -50%)',
                      fontSize: text.fontSize,
                      color: text.color
                    }}
                  >
                    {text.content}
                  </div>
                ))}
                {template.content?.images?.map((image) => (
                  <div
                    key={image.id}
                    className="absolute"
                    style={{
                      left: `${image.position.x}%`,
                      top: `${image.position.y}%`,
                      width: `${image.size.width}px`,
                      height: `${image.size.height}px`
                    }}
                  >
                    <img
                      src={image.src}
                      alt="Template"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={() => onSend(template.id)}
              className="bg-[#ef3826] text-white px-12 py-4 rounded-[100px] font-['Montserrat'] font-medium hover:bg-red-600 transition-colors border border-[#000000] leading-[1.2]"
            >
              send now
            </button>

            {/* Action Buttons */}
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => onEdit(template)}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Edit Template"
              >
                <Edit2 className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => onDelete(template.id)}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title="Delete Template"
              >
                <Trash2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

SavedTemplatesSection.displayName = 'SavedTemplatesSection';

const TemplateNameInput = memo(({ value, onChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter template name..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg font-['Montserrat'] text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
});

TemplateNameInput.displayName = 'TemplateNameInput';

// Main Component
const EmailAndSmsTemplateManagementScreenPage = () => {
  const {
    currentTemplate,
    savedTemplates,
    isEditing,
    setIsEditing,
    selectedElement,
    setSelectedElement,
    updateTemplate,
    addText,
    addImage,
    saveTemplate,
    deleteTemplate,
    editTemplate
  } = useTemplateEditor();

  const handleNewTemplate = useCallback(() => {
    setCurrentTemplate(DEFAULT_TEMPLATE);
    setIsEditing(true);
    setSelectedElement(null);
  }, [setCurrentTemplate, setIsEditing, setSelectedElement]);

  const handleSave = useCallback(() => {
    saveTemplate();
  }, [saveTemplate]);

  const handleSendTemplate = useCallback((templateId) => {
    alert(`Sending template ${templateId}...`);
  }, []);

  const handleToolApply = useCallback((toolId, elementId) => {
    // Implement tool functionality based on toolId
    console.log(`Applying tool ${toolId} to element ${elementId}`);
  }, []);

  const handlePositionUpdate = useCallback((elementId, newPosition) => {
    updateTemplate({
      content: {
        ...currentTemplate.content,
        texts: currentTemplate.content?.texts?.map(text => 
          text.id === elementId ? { ...text, position: newPosition } : text
        ) || [],
        images: currentTemplate.content?.images?.map(image => 
          image.id === elementId ? { ...image, position: newPosition } : image
        ) || []
      }
    });
  }, [currentTemplate.content, updateTemplate]);

  const handleTemplateNameChange = useCallback((name) => {
    updateTemplate({ name });
  }, [updateTemplate]);

  return (
    <div className="bg-white min-h-screen font-['Montserrat']">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-[24px] font-bold text-[#000000] font-['Montserrat'] leading-[22px]">
          Email and sms template mgt screen
        </h1>
      </div>

      {/* Create/Edit Template Section */}
      {isEditing && (
        <div className="px-8 mb-12">
          <TemplateNameInput
            value={currentTemplate.name}
            onChange={handleTemplateNameChange}
          />
          
          <div className="flex gap-8 mb-8">
            {/* Left Side - Image Upload and Text Input */}
            <div className="flex gap-8">
              <ImageUploadSection onImageUpload={addImage} />
              <TextInputSection onTextAdd={addText} />
            </div>

            {/* Center - Template Preview */}
            <div className="flex-1">
              <TemplatePreview
                template={currentTemplate}
                onElementSelect={setSelectedElement}
                selectedElement={selectedElement}
                onPositionUpdate={handlePositionUpdate}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleSave}
              className="bg-black text-white px-12 py-4 rounded-[100px] font-['Montserrat'] font-medium hover:bg-gray-800 transition-colors leading-[1.2]"
            >
              save
            </button>
          </div>

          {/* Editing Tools */}
          <div className="relative">
            <div className="flex justify-center mb-8">
              <BasicEditingTools 
                onToolApply={handleToolApply}
                selectedElement={selectedElement}
              />
            </div>
            
            <AdvancedEditingTools 
              onToolApply={handleToolApply}
              selectedElement={selectedElement}
            />
          </div>
        </div>
      )}

      {/* New Template Button */}
      {!isEditing && (
        <div className="text-center mb-8">
          <button
            onClick={handleNewTemplate}
            className="bg-[#000aff] text-white px-8 py-3 rounded-lg font-['Montserrat'] font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-[#7280ff]"
          >
            <Plus className="w-5 h-5" />
            Create New Template
          </button>
        </div>
      )}

      {/* Saved Templates Section */}
      <div className="px-8">
        <SavedTemplatesSection
          templates={savedTemplates}
          onEdit={editTemplate}
          onDelete={deleteTemplate}
          onSend={handleSendTemplate}
        />
      </div>
    </div>
  );
};

export default EmailAndSmsTemplateManagementScreenPage;
