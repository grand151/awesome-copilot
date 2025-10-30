import { WebContainer } from '@webcontainer/api';
import { initializeFilesWithTemplate, detectProjectType } from './templates';

let webcontainerInstance = null;

export async function getWebContainer() {
  if (!webcontainerInstance) {
    webcontainerInstance = await WebContainer.boot();
  }
  return webcontainerInstance;
}

export async function initializeFiles(webcontainer, templateName = 'nodejs') {
  const template = await initializeFilesWithTemplate(webcontainer, templateName);
  return template;
}

export async function switchTemplate(webcontainer, templateName) {
  // Clear existing files
  try {
    const files = await webcontainer.fs.readdir('.');
    for (const file of files) {
      await webcontainer.fs.rm(file, { recursive: true, force: true });
    }
  } catch (e) {
    console.warn('Error clearing files:', e);
  }
  
  // Mount new template
  return await initializeFiles(webcontainer, templateName);
}

export async function detectAndSwitchTemplate(webcontainer) {
  try {
    const files = await webcontainer.fs.readdir('.', { withFileTypes: true });
    const fileContents = {};
    
    for (const file of files) {
      if (!file.isDirectory()) {
        try {
          const content = await webcontainer.fs.readFile(file.name, 'utf-8');
          fileContents[file.name] = content;
        } catch (e) {
          // Skip unreadable files
        }
      }
    }
    
    const detectedType = detectProjectType(fileContents);
    return detectedType;
  } catch (e) {
    console.error('Error detecting project type:', e);
    return 'nodejs';
  }
}

export { detectProjectType };
