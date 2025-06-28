import {MMKVLoader} from 'react-native-mmkv-storage';

const storage = new MMKVLoader().withInstanceID('@quiz').initialize();

/**
 * Bloco de Funções Síncronas
 */

export function load<T = any>(key: string): T | null {
  try {
    const result = storage.getString(key);
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return null;
  }
}

export function loadString(key: string): string | null {
  try {
    const result = storage.getString(key);
    return result !== undefined ? result : null;
  } catch (error) {
    console.error('Erro ao carregar string:', error);
    return null;
  }
}

export function loadBoolean(key: string): boolean | undefined {
  try {
    const result = storage.getBool(key);
    return result !== null ? result : undefined;
  } catch (error) {
    console.error('Erro ao carregar booleano:', error);
    return undefined;
  }
}

export function save(key: string, value: any): boolean {
  try {
    saveString(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    return false;
  }
}

export function saveString(key: string, value: string): boolean {
  try {
    storage.setString(key, value);
    return true;
  } catch (error) {
    console.error('Erro ao salvar string:', error);
    return false;
  }
}

export function saveBoolean(key: string, value: boolean): boolean {
  try {
    storage.setBool(key, value);
    return true;
  } catch (error) {
    console.error('Erro ao salvar booleano:', error);
    return false;
  }
}

export function remove(key: string): void {
  try {
    storage.removeItem(key);
  } catch (error) {
    console.error('Erro ao remover item:', error);
  }
}

export function clear(): void {
  try {
    storage.clearStore();
  } catch (error) {
    console.error('Erro ao limpar storage:', error);
  }
}

/**
 * Bloco de Funções Assíncronas
 */

export async function loadAsync<T = any>(key: string): Promise<T | null> {
  try {
    const result = await storage.getStringAsync(key);
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error('Erro ao carregar dados assíncronos:', error);
    return null;
  }
}

export async function loadStringAsync(key: string): Promise<string | null> {
  try {
    const result = await storage.getStringAsync(key);
    return result !== undefined ? result : null;
  } catch (error) {
    console.error('Erro ao carregar string assíncrona:', error);
    return null;
  }
}

export async function saveAsync(key: string, value: any): Promise<boolean> {
  try {
    await saveStringAsync(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados assíncronos:', error);
    return false;
  }
}

export async function saveStringAsync(
  key: string,
  value: string,
): Promise<boolean> {
  try {
    await storage.setStringAsync(key, value);
    return true;
  } catch (error) {
    console.error('Erro ao salvar string assíncrona:', error);
    return false;
  }
}

export async function saveArrayAsync(
  key: string,
  value: object[],
): Promise<boolean> {
  try {
    await storage.setArrayAsync(key, value);
    return true;
  } catch (error) {
    console.error('Erro ao salvar array assíncrono:', error);
    return false;
  }
}

export async function loadArrayOfObjectsAsync(key: string): Promise<any[]> {
  try {
    const storedArray = await storage.getArrayAsync(key);
    return Array.isArray(storedArray) ? storedArray : [];
  } catch (error) {
    console.error('Erro ao carregar array de objetos:', error);
    return [];
  }
}
