import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Application from 'expo-application';
import { compareVersions } from '@/utils/Strings';
import {
  getVersionControlData,
  updatePlatformVersion,
  updateMessages,
  toggleMaintenanceMode,
} from '@/services/firestore';

const VERSION_CONTROL_DOC = 'version_control';
const APP_SETTINGS_COLLECTION = 'app_settings';

interface VersionControlData {
  ios?: {
    minimum_required_version: string;
    latest_version: string;
    critical: boolean;
    update_url: string;
  };
  android?: {
    minimum_required_version: string;
    latest_version: string;
    critical: boolean;
    update_url: string;
  };
  maintenance_mode?: boolean;
  maintenance_message?: string;
  message?: string;
  updated_at?: string;
}

export function useVersionControl() {
  const [versionData, setVersionData] = useState<VersionControlData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar dados de version control
  const fetchVersionData = async () => {
    try {
      setLoading(true);
      const data = await getVersionControlData();

      if (data) {
        setVersionData(data);
      } else {
        setError('Documento de version control não encontrado');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Atualizar dados de version control
  const updateVersionData = async (newData: Partial<VersionControlData>) => {
    try {
      // Esta função é genérica e pode precisar ser desmembrada em funções específicas
      // Para manter compatibilidade, vamos implementar uma solução básica
      // Em produção, seria melhor usar as funções específicas do serviço
      let result;

      if (newData.ios) {
        result = await updatePlatformVersion('ios', newData.ios);
      } else if (newData.android) {
        result = await updatePlatformVersion('android', newData.android);
      } else if (newData.message !== undefined) {
        result = await updateMessages(newData.message);
      } else if (newData.maintenance_mode !== undefined) {
        result = await toggleMaintenanceMode(newData.maintenance_mode, newData.maintenance_message);
      } else {
        // Para outros tipos de atualização, usaríamos uma função genérica se existisse
        throw new Error('Tipo de atualização não suportado');
      }

      if (result.success) {
        // Atualizar os dados locais
        await fetchVersionData();
        return { success: true };
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Verificar se precisa de atualização
  const checkVersion = () => {
    if (!versionData) return { needUpdate: false, critical: false };

    const platform = Platform.OS === 'ios' ? 'ios' : 'android';
    const platformData = versionData[platform];
    const currentVersion = Application.nativeApplicationVersion;

    if (!platformData || !currentVersion) {
      return { needUpdate: false, critical: false };
    }

    // Verificar se está em modo de manutenção
    if (versionData.maintenance_mode) {
      return {
        needUpdate: true,
        critical: true,
        maintenance: true,
        message: versionData.maintenance_message,
      };
    }

    // Verificar se a versão atual é menor que a mínima requerida
    const needUpdate = compareVersions(currentVersion, platformData.minimum_required_version) < 0;
    const isLatest = compareVersions(currentVersion, platformData.latest_version) >= 0;

    return {
      needUpdate,
      critical: needUpdate && platformData.critical,
      maintenance: false,
      currentVersion,
      minimumVersion: platformData.minimum_required_version,
      latestVersion: platformData.latest_version,
      updateUrl: platformData.update_url,
      message: versionData.message,
      isLatest,
    };
  };

  useEffect(() => {
    fetchVersionData();

    // Listener em tempo real foi removido pois não há equivalente no serviço
    // Para atualizações em tempo real, seria necessário implementar uma função específica no serviço
    // ou usar polling com fetchVersionData em intervalos regulares
  }, []);

  return {
    versionData,
    loading,
    error,
    checkVersion,
    updateVersionData,
    refetch: fetchVersionData,
  };
}
