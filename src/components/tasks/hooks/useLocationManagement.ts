import { useState, useCallback } from 'react';
import { locationServiceMock } from '../../../services/locationservicesimulation';
import { Location } from '../types';

export const useLocationManagement = () => {
  const [states, setStates] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [mandals, setMandals] = useState<Location[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  const fetchStates = useCallback(async () => {
    setLoadingLocations(true);
    try {
      const result = await locationServiceMock.fetchLocations('state');
      if (result.success && result.data) {
        setStates(result.data.locations);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
    } finally {
      setLoadingLocations(false);
    }
  }, []);

  const fetchDistricts = useCallback(async (stateId: string) => {
    setLoadingLocations(true);
    try {
      const result = await locationServiceMock.fetchStateDistricts(stateId);
      if (result.success && result.data) {
        setDistricts(result.data.locations);
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    } finally {
      setLoadingLocations(false);
    }
  }, []);

  const fetchMandals = useCallback(async (districtId: string) => {
    setLoadingLocations(true);
    try {
      const result = await locationServiceMock.fetchDistrictCities(districtId);
      if (result.success && result.data) {
        setMandals(result.data.locations);
      }
    } catch (error) {
      console.error('Error fetching mandals:', error);
    } finally {
      setLoadingLocations(false);
    }
  }, []);

  return {
    states,
    districts,
    mandals,
    loadingLocations,
    setStates,
    setDistricts,
    setMandals,
    fetchStates,
    fetchDistricts,
    fetchMandals,
  };
};
