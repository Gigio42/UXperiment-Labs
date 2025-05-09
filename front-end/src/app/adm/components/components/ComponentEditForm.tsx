import React, { useState } from 'react';
import { Component } from '@/types/component';
import { ComponentsService } from '@/services/ComponentsService';
import styles from '../components.module.css';
import aiStyles from '../components-ai.module.css';

interface ComponentEditFormProps {
  component: Component;
  onSuccess: (component: Component) => void;
  onCancel: () => void;
}

const CATEGORY_OPTIONS = [
  'Buttons',
  'Cards',
  'Forms',
  'Navigation',
  'Layouts',
  'UI Elements',
  'Typography',
  'Outros'
];

const COLOR_OPTIONS = [
  { name: 'Primary', value: '#6366F1' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Yellow', value: '#F59E0B' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Pink', value: '#EC4899' },
];

/**
 * Formulário para editar componentes existentes
 */
export default function ComponentEditForm({ component, onSuccess, onCancel }: ComponentEditFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(!!component.htmlContent);
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [formData, setFormData] = useState({
    name: component.name,
    cssContent: component.cssContent,
    htmlContent: component.htmlContent || '',
    category: component.category || 'Outros',
    color: component.color || '#6366F1'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validações básicas no lado do cliente
      if (!formData.name.trim()) {
        throw new Error('O nome do componente é obrigatório');
      }
      
      if (!formData.cssContent.trim()) {
        throw new Error('O conteúdo CSS é obrigatório');
      }
      
      const updatedComponent = await ComponentsService.updateComponent(component.id, formData);
      onSuccess(updatedComponent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao atualizar o componente');
      console.error('Erro ao atualizar componente:', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePreview = () => {
    setShowPreview(prev => !prev);
  };

  return (
    <div className={styles.componentForm}>
      <h2 className={styles.formTitle}>Editar Componente</h2>
      
      {error && (
        <div className={styles.errorMessage}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {formData.htmlContent && (
        <div className={styles.previewToggle}>
          <button 
            type="button" 
            className={styles.togglePreviewButton}
            onClick={togglePreview}
          >
            {showPreview ? 'Ocultar Preview' : 'Mostrar Preview'}
          </button>
        </div>
      )}
        {showPreview && formData.htmlContent && (
        <div className={aiStyles.previewSection}>
          <div className={aiStyles.previewHeader}>
            <h3 className={aiStyles.sectionTitle}>Preview do Componente</h3>
            <div className={aiStyles.previewControls}>
              <div className={aiStyles.previewModeToggle}>
                <button
                  type="button"
                  className={`${aiStyles.previewModeButton} ${previewMode === 'light' ? aiStyles.previewModeActive : ''}`}
                  onClick={() => setPreviewMode('light')}
                >
                  Claro
                </button>
                <button
                  type="button"
                  className={`${aiStyles.previewModeButton} ${previewMode === 'dark' ? aiStyles.previewModeActive : ''}`}
                  onClick={() => setPreviewMode('dark')}
                >
                  Escuro
                </button>
              </div>
            </div>
          </div>          <div className={aiStyles.previewResponsiveControls}>
            <button 
              className={`${aiStyles.previewResponsiveButton} ${previewDevice === 'desktop' ? aiStyles.previewResponsiveActive : ''}`} 
              title="Desktop"
              onClick={() => setPreviewDevice('desktop')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 21H16M12 17V21M6.8 17H17.2C18.8802 17 19.7202 17 20.362 16.673C20.9265 16.3854 21.3854 15.9265 21.673 15.362C22 14.7202 22 13.8802 22 12.2V7.8C22 6.11984 22 5.27976 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H6.8C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8V12.2C2 13.8802 2 14.7202 2.32698 15.362C2.6146 15.9265 3.07354 16.3854 3.63803 16.673C4.27976 17 5.11984 17 6.8 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={`${aiStyles.previewResponsiveButton} ${previewDevice === 'tablet' ? aiStyles.previewResponsiveActive : ''}`} 
              title="Tablet"
              onClick={() => setPreviewDevice('tablet')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.5V19.5M9.6 21.5H14.4C16.0509 21.5 16.8763 21.5 17.5 21.1481C18.0353 20.8381 18.4722 20.3539 18.74 19.76C19.05 19.0727 19.05 18.1618 19.05 16.34V7.66C19.05 5.83821 19.05 4.92731 18.74 4.24C18.4722 3.6461 18.0353 3.16188 17.5 2.85192C16.8763 2.5 16.0509 2.5 14.4 2.5H9.6C7.94912 2.5 7.12368 2.5 6.5 2.85192C5.96469 3.16188 5.52777 3.6461 5.26 4.24C4.95 4.92731 4.95 5.83821 4.95 7.66V16.34C4.95 18.1618 4.95 19.0727 5.26 19.76C5.52777 20.3539 5.96469 20.8381 6.5 21.1481C7.12368 21.5 7.94912 21.5 9.6 21.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={`${aiStyles.previewResponsiveButton} ${previewDevice === 'mobile' ? aiStyles.previewResponsiveActive : ''}`} 
              title="Mobile"
              onClick={() => setPreviewDevice('mobile')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18V18.01M8.2 22H15.8C16.9201 22 17.4802 22 17.908 21.782C18.2843 21.5903 18.5903 21.2843 18.782 20.908C19 20.4802 19 19.9201 19 18.8V5.2C19 4.07989 19 3.51984 18.782 3.09202C18.5903 2.71569 18.2843 2.40973 17.908 2.21799C17.4802 2 16.9201 2 15.8 2H8.2C7.07989 2 6.51984 2 6.09202 2.21799C5.71569 2.40973 5.40973 2.71569 5.21799 3.09202C5 3.51984 5 4.07989 5 5.2V18.8C5 19.9201 5 20.4802 5.21799 20.908C5.40973 21.2843 5.71569 21.5903 6.09202 21.782C6.51984 22 7.07989 22 8.2 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>          <div className={`${aiStyles.componentPreviewContainer} ${previewMode === 'light' ? aiStyles.previewLight : aiStyles.previewDark}`}>
            <div 
              className={`${aiStyles.componentPreviewFrame} ${aiStyles['preview' + previewDevice.charAt(0).toUpperCase() + previewDevice.slice(1)]}`}
              dangerouslySetInnerHTML={{ 
                __html: `
                <style>
                  /* Reset básico para o preview */
                  * { box-sizing: border-box; }
                  body { margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
                  
                  /* Estilos do componente */
                  ${formData.cssContent}
                </style>
                <div class="preview-wrapper">${formData.htmlContent}</div>
                ` 
              }}
            />
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome do Componente *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Botão Moderno"
            className={styles.formInput}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={styles.formSelect}
          >
            {CATEGORY_OPTIONS.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="color">Cor Representativa</label>
          <div className={styles.colorPickerContainer}>
            <select
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className={styles.formSelect}
            >
              {COLOR_OPTIONS.map(color => (
                <option key={color.value} value={color.value}>{color.name}</option>
              ))}
            </select>
            <div 
              className={styles.colorPreview} 
              style={{ backgroundColor: formData.color }}
              aria-hidden="true"
            ></div>
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="htmlContent">Código HTML</label>
          <textarea
            id="htmlContent"
            name="htmlContent"
            value={formData.htmlContent}
            onChange={handleChange}
            placeholder="<button class='btn'>Click me</button>"
            className={styles.formTextarea}
            rows={6}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="cssContent">Código CSS *</label>
          <textarea
            id="cssContent"
            name="cssContent"
            value={formData.cssContent}
            onChange={handleChange}
            placeholder=".component {\n  color: #6366F1;\n  padding: 1rem;\n}"
            className={styles.formTextarea}
            rows={10}
            required
          />
        </div>
        
        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className={styles.smallSpinner}></span>
                Atualizando...
              </>
            ) : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}
