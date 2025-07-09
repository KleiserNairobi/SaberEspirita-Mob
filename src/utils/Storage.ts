import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'quiz' });

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
    return result ?? null;
  } catch (error) {
    console.error('Erro ao carregar string:', error);
    return null;
  }
}

export function loadBoolean(key: string): boolean | undefined {
  try {
    return storage.getBoolean(key) ?? undefined;
  } catch (error) {
    console.error('Erro ao carregar booleano:', error);
    return undefined;
  }
}

export function save(key: string, value: any): boolean {
  try {
    return saveString(key, JSON.stringify(value));
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    return false;
  }
}

export function saveString(key: string, value: string): boolean {
  try {
    storage.set(key, value);
    return true;
  } catch (error) {
    console.error('Erro ao salvar string:', error);
    return false;
  }
}

export function saveBoolean(key: string, value: boolean): boolean {
  try {
    storage.set(key, value);
    return true;
  } catch (error) {
    console.error('Erro ao salvar booleano:', error);
    return false;
  }
}

export function remove(key: string): void {
  try {
    storage.delete(key);
  } catch (error) {
    console.error('Erro ao remover item:', error);
  }
}

export function clear(): void {
  try {
    storage.clearAll();
  } catch (error) {
    console.error('Erro ao limpar storage:', error);
  }
}
