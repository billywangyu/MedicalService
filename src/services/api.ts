// services/api.ts
import {
  MedicalService,
  City,
  EthnicGroup,
  Attraction,
  Food,
  Hotel,
  Transport,
  LocalProduct,
  Festival,
  LocalWeather,
} from '../types/MedicalService';

/**
 * Fetch medical services for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<MedicalService[]>} - A promise that resolves to an array of MedicalService objects
 * @throws {Error} - Throws an error if the request fails
 */
export const fetchMedicalServices = async (cityId: string): Promise<MedicalService[]> => {
  try {
    const response = await fetch(`/api/data?type=medical&cityId=${cityId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch medical services: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching medical services:', error);
    throw error;
  }
};

/**
 * Fetch all cities
 * @returns {Promise<City[]>} - A promise that resolves to an array of City objects
 * @throws {Error} - Throws an error if the request fails
 */
export const fetchCities = async (): Promise<City[]> => {
  try {
    const response = await fetch('/api/data?type=city');
    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

/**
 * Fetch ethnic groups for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<EthnicGroup[]>} - A promise that resolves to an array of EthnicGroup objects
 * @throws {Error} - Throws an error if the request fails
 */
export const fetchEthnicGroups = async (cityId: string): Promise<EthnicGroup[]> => {
  try {
    const response = await fetch(`/api/data?type=ethnic_group&cityId=${cityId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ethnic groups: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching ethnic groups:', error);
    throw error;
  }
};

/**
 * Fetch attractions for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<Attraction[]>} - A promise that resolves to an array of Attraction objects
 * @throws {Error} - Throws an error if the request fails
 */
export const fetchAttractions = async (cityId: string): Promise<Attraction[]> => {
  try {
    const response = await fetch(`/api/data?type=attraction&cityId=${cityId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch attractions: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching attractions:', error);
    throw error;
  }
};

/**
 * Fetch foods for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<Food[]>} - A promise that resolves to an array of Food objects
 * @throws {Error} - Throws an error if the request fails
 */
export const fetchFoods = async (cityId: string): Promise<Food[]> => {
  try {
    const response = await fetch(`/api/data?type=food&cityId=${cityId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch foods: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

/**
 * Fetch hotels for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<Hotel[]>} - A promise that resolves to an array of Hotel objects
 * @throws {Error} - Throws an error if the request fails
 */
export const fetchHotels = async (cityId: string): Promise<Hotel[]> => {
  try {
    const response = await fetch(`/api/data?type=hotel&cityId=${cityId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch hotels: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

/**
 * Fetch transport options for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<Transport[]>} - A promise that resolves to an array of Transport objects
 * @throws {Error} - Throws an error if the request fails
 */
export const fetchTransports = async (cityId: string): Promise<Transport[]> => {
  try {
    const response = await fetch(`/api/data?type=transport&cityId=${cityId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch transports: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching transports:', error);
    throw error;
  }
};

/**
 * Fetch local products for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<LocalProduct[]>} - A promise that resolves to an array of LocalProduct objects
 * @throws {Error} - Throws an error if the request fails
 */
export const fetchLocalProducts = async (cityId: string): Promise<LocalProduct[]> => {
  try {
    const response = await fetch(`/api/data?type=local_product&cityId=${cityId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch local products: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching local products:', error);
    throw error;
  }
};

/**
 * Fetch festivals for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<Festival[]>} - A promise that resolves to an array of Festival objects
 * @throws {Error} - Throws an error if the request fails
 */
export const fetchFestivals = async (cityId: string): Promise<Festival[]> => {
  try {
    const response = await fetch(`/api/data?type=festival&cityId=${cityId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch festivals: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching festivals:', error);
    throw error;
  }
};

/**
 * Fetch local weather for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<LocalWeather[]>} - A promise that resolves to an array of LocalWeather objects
 * @throws {Error} - Throws an error if the request fails
 */
export const fetchLocalWeather = async (cityId: string): Promise<LocalWeather[]> => {
  try {
    const response = await fetch(`/api/data?type=local_weather&cityId=${cityId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch local weather: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching local weather:', error);
    throw error;
  }
};
