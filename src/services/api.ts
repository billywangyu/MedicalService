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
 * Generic function to fetch data from the API
 * @param {string} type - The type of data to fetch
 * @param {string} cityId - The ID of the city (optional)
 * @returns {Promise<T[]>} - A promise that resolves to an array of data objects
 * @throws {Error} - Throws an error if the request fails
 */
const fetchData = async <T>(type: string, cityId?: string): Promise<T[]> => {
  const url = cityId ? `/api/data?type=${type}&cityId=${cityId}` : `/api/data?type=${type}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${type}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    throw error;
  }
};

/**
 * Fetch data for a specific category and city
 * @param {string} cityId - The ID of the city
 * @param {string} category - The category to fetch data for
 * @returns {Promise<any>} - A promise that resolves to the fetched data
 * @throws {Error} - Throws an error if the request fails
 */
export const fetchCategoryData = async (cityId: string, category: string): Promise<any> => {
  switch (category) {
    case '医疗服务':
      return fetchMedicalServices(cityId);
    case '民族':
      return fetchEthnicGroups(cityId);
    case '景点':
      return fetchAttractions(cityId);
    case '美食':
      return fetchFoods(cityId);
    case '酒店':
      return fetchHotels(cityId);
    case '交通':
      return fetchTransports(cityId);
    case '特产':
      return fetchLocalProducts(cityId);
    case '节日活动':
      return fetchFestivals(cityId);
    case '天气':
      return fetchLocalWeather(cityId);
    default:
      throw new Error(`Unknown category: ${category}`);
  }
};

/**
 * Fetch medical services for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<MedicalService[]>} - A promise that resolves to an array of MedicalService objects
 */
export const fetchMedicalServices = async (cityId: string): Promise<MedicalService[]> => {
  return fetchData<MedicalService>('medical', cityId);
};

/**
 * Fetch all cities
 * @returns {Promise<City[]>} - A promise that resolves to an array of City objects
 */
export const fetchCities = async (): Promise<City[]> => {
  return fetchData<City>('city');
};

/**
 * Fetch ethnic groups for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<EthnicGroup[]>} - A promise that resolves to an array of EthnicGroup objects
 */
export const fetchEthnicGroups = async (cityId: string): Promise<EthnicGroup[]> => {
  return fetchData<EthnicGroup>('ethnic_group', cityId);
};

/**
 * Fetch attractions for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<Attraction[]>} - A promise that resolves to an array of Attraction objects
 */
export const fetchAttractions = async (cityId: string): Promise<Attraction[]> => {
  return fetchData<Attraction>('attraction', cityId);
};

/**
 * Fetch foods for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<Food[]>} - A promise that resolves to an array of Food objects
 */
export const fetchFoods = async (cityId: string): Promise<Food[]> => {
  return fetchData<Food>('food', cityId);
};

/**
 * Fetch hotels for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<Hotel[]>} - A promise that resolves to an array of Hotel objects
 */
export const fetchHotels = async (cityId: string): Promise<Hotel[]> => {
  return fetchData<Hotel>('hotel', cityId);
};

/**
 * Fetch transport options for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<Transport[]>} - A promise that resolves to an array of Transport objects
 */
export const fetchTransports = async (cityId: string): Promise<Transport[]> => {
  return fetchData<Transport>('transport', cityId);
};

/**
 * Fetch local products for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<LocalProduct[]>} - A promise that resolves to an array of LocalProduct objects
 */
export const fetchLocalProducts = async (cityId: string): Promise<LocalProduct[]> => {
  return fetchData<LocalProduct>('local_product', cityId);
};

/**
 * Fetch festivals for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<Festival[]>} - A promise that resolves to an array of Festival objects
 */
export const fetchFestivals = async (cityId: string): Promise<Festival[]> => {
  return fetchData<Festival>('festival', cityId);
};

/**
 * Fetch local weather for a specific city
 * @param {string} cityId - The ID of the city
 * @returns {Promise<LocalWeather[]>} - A promise that resolves to an array of LocalWeather objects
 */
export const fetchLocalWeather = async (cityId: string): Promise<LocalWeather[]> => {
  return fetchData<LocalWeather>('local_weather', cityId);
};
