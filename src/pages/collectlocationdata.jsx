/**
 * Location Data Collection Module
 *
 * This module handles all location data collection functionality
 * including geolocation services, IP-based location detection,
 * user location preferences, privacy controls, and location analytics.
 *
 * Features:
 * - Real-time geolocation tracking
 * - IP-based location detection
 * - Location history management
 * - Privacy and consent controls
 * - Location-based analytics
 * - Data export/import functionality
 * - Location accuracy settings
 */

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

// ==============================
// CONSTANTS
// ==============================

const LOCATION_ACCURACY_LEVELS = Object.freeze({
  HIGH: "high", // GPS accuracy
  MEDIUM: "medium", // Network accuracy
  LOW: "low", // IP-based accuracy
  DISABLED: "disabled", // No location tracking
});

const LOCATION_DATA_TYPES = Object.freeze({
  GPS_COORDINATES: "gpsCoordinates",
  IP_LOCATION: "ipLocation",
  WIFI_LOCATION: "wifiLocation",
  CELLULAR_LOCATION: "cellularLocation",
  TIMEZONE: "timezone",
  ADDRESS: "address",
  COUNTRY: "country",
  REGION: "region",
  CITY: "city",
});

const COLLECTION_METHODS = Object.freeze({
  AUTOMATIC: "automatic",
  MANUAL: "manual",
  ON_REQUEST: "onRequest",
  PERIODIC: "periodic",
});

const PRIVACY_LEVELS = Object.freeze({
  EXACT: "exact", // Exact coordinates
  APPROXIMATE: "approximate", // Rounded to nearest km
  CITY_LEVEL: "cityLevel", // City level only
  COUNTRY_LEVEL: "countryLevel", // Country level only
  ANONYMOUS: "anonymous", // No location data
});

const DEFAULT_LOCATION_SETTINGS = Object.freeze({
  collectionEnabled: false,
  accuracyLevel: LOCATION_ACCURACY_LEVELS.MEDIUM,
  collectionMethod: COLLECTION_METHODS.ON_REQUEST,
  privacyLevel: PRIVACY_LEVELS.CITY_LEVEL,
  retentionPeriod: 30, // days
  shareWithThirdParties: false,
  anonymizeData: true,
  enableLocationHistory: false,
  enableAnalytics: true,
  backgroundTracking: false,
  frequencyMinutes: 60,
  radiusMeters: 100,
  consentTimestamp: null,
  lastUpdated: null,
});

// ==============================
// MEMOIZED HELPER FUNCTIONS
// ==============================

const GEOLOCATION_OPTIONS_CACHE = new Map();

const getGeolocationOptions = (accuracyLevel) => {
  if (GEOLOCATION_OPTIONS_CACHE.has(accuracyLevel)) {
    return GEOLOCATION_OPTIONS_CACHE.get(accuracyLevel);
  }

  const options = {
    [LOCATION_ACCURACY_LEVELS.HIGH]: {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 60000,
    },
    [LOCATION_ACCURACY_LEVELS.MEDIUM]: {
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 300000,
    },
    [LOCATION_ACCURACY_LEVELS.LOW]: {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 600000,
    },
  }[accuracyLevel] || {
    enableHighAccuracy: false,
    timeout: 15000,
    maximumAge: 300000,
  };

  GEOLOCATION_OPTIONS_CACHE.set(accuracyLevel, options);
  return options;
};

const RADIAN_CONVERSION = Math.PI / 180;
const EARTH_RADIUS_KM = 6371;

// ==============================
// LOCATION DATA COLLECTION CLASS
// ==============================

class LocationDataCollector {
  constructor() {
    this.settings = { ...DEFAULT_LOCATION_SETTINGS };
    this.locationHistory = [];
    this.currentLocation = null;
    this.watchId = null;
    this.analyticsData = {};
    this.consentRecords = [];
    this.isTracking = false;

    // Performance optimizations
    this.saveTimeout = null;
    this.lastSaveTime = 0;
    this.SAVE_DEBOUNCE_MS = 1000;
    this.eventListeners = new Map();
    this.permissionCache = null;
    this.permissionCacheTime = 0;
    this.PERMISSION_CACHE_DURATION = 60000; // 1 minute
  }

  /**
   * Initialize the location data collector
   */
  async initialize() {
    try {
      await this.loadSettings();
      await this.loadLocationHistory();
      this.setupEventListeners();

      if (
        this.settings.collectionEnabled &&
        this.settings.collectionMethod === COLLECTION_METHODS.AUTOMATIC
      ) {
        await this.startLocationTracking();
      }

      console.log("Location Data Collector initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Location Data Collector:", error);
    }
  }

  /**
   * Load settings from storage with error handling
   */
  async loadSettings() {
    try {
      const savedSettings = localStorage.getItem("locationDataSettings");
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        this.settings = Object.assign({}, DEFAULT_LOCATION_SETTINGS, parsed);
      }
    } catch (error) {
      console.error("Error loading location settings:", error);
      this.settings = { ...DEFAULT_LOCATION_SETTINGS };
    }
  }

  /**
   * Save settings to storage with debouncing
   */
  async saveSettings() {
    const now = Date.now();

    // Debounce saves to prevent excessive localStorage writes
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(() => {
      try {
        this.settings.lastUpdated = new Date().toISOString();
        localStorage.setItem(
          "locationDataSettings",
          JSON.stringify(this.settings)
        );
        this.lastSaveTime = now;
      } catch (error) {
        console.error("Error saving location settings:", error);
      }
    }, this.SAVE_DEBOUNCE_MS);
  }

  /**
   * Load location history from storage
   */
  async loadLocationHistory() {
    try {
      const savedHistory = localStorage.getItem("locationDataHistory");
      if (savedHistory) {
        this.locationHistory = JSON.parse(savedHistory);
        this.cleanupExpiredData();
      }
    } catch (error) {
      console.error("Error loading location history:", error);
    }
  }

  /**
   * Save location history to storage
   */
  async saveLocationHistory() {
    try {
      localStorage.setItem(
        "locationDataHistory",
        JSON.stringify(this.locationHistory)
      );
    } catch (error) {
      console.error("Error saving location history:", error);
    }
  }

  /**
   * Update location settings with shallow comparison
   */
  updateSettings(newSettings) {
    const oldSettings = this.settings;
    const hasChanges = Object.keys(newSettings).some(
      (key) => oldSettings[key] !== newSettings[key]
    );

    if (!hasChanges) return;

    this.settings = Object.assign({}, this.settings, newSettings);
    this.saveSettings();
    this.recordConsentChange(newSettings);

    // Handle tracking state changes
    if (oldSettings.collectionEnabled !== this.settings.collectionEnabled) {
      if (this.settings.collectionEnabled) {
        this.startLocationTracking();
      } else {
        this.stopLocationTracking();
      }
    }
  }

  /**
   * Record consent change
   */
  recordConsentChange(settings) {
    const consentRecord = {
      timestamp: new Date().toISOString(),
      settings: { ...settings },
      ipAddress: this.getUserIPAddress(),
      userAgent: navigator.userAgent,
      changeType: settings.collectionEnabled ? "granted" : "revoked",
    };

    this.consentRecords.push(consentRecord);
    this.saveConsentRecords();
  }

  /**
   * Save consent records
   */
  saveConsentRecords() {
    try {
      localStorage.setItem(
        "locationDataConsent",
        JSON.stringify(this.consentRecords)
      );
    } catch (error) {
      console.error("Error saving consent records:", error);
    }
  }

  /**
   * Start location tracking
   */
  async startLocationTracking() {
    if (!this.settings.collectionEnabled || this.isTracking) return;

    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by this browser");
      }

      // Request permission
      const permission = await this.requestLocationPermission();
      if (permission !== "granted") {
        throw new Error("Location permission denied");
      }

      const options = this.getGeolocationOptions();

      if (
        this.settings.collectionMethod === COLLECTION_METHODS.PERIODIC ||
        this.settings.backgroundTracking
      ) {
        // Start watching position
        this.watchId = navigator.geolocation.watchPosition(
          (position) => this.handleLocationSuccess(position),
          (error) => this.handleLocationError(error),
          options
        );
      } else {
        // Get current position once
        navigator.geolocation.getCurrentPosition(
          (position) => this.handleLocationSuccess(position),
          (error) => this.handleLocationError(error),
          options
        );
      }

      this.isTracking = true;
      console.log("Location tracking started");
    } catch (error) {
      console.error("Failed to start location tracking:", error);
      this.handleLocationError(error);
    }
  }

  /**
   * Stop location tracking
   */
  stopLocationTracking() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
    this.isTracking = false;
    console.log("Location tracking stopped");
  }

  /**
   * Request location permission with caching
   */
  async requestLocationPermission() {
    try {
      const now = Date.now();

      // Use cached permission if still valid
      if (
        this.permissionCache &&
        now - this.permissionCacheTime < this.PERMISSION_CACHE_DURATION
      ) {
        return this.permissionCache;
      }

      if ("permissions" in navigator) {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });
        this.permissionCache = permission.state;
        this.permissionCacheTime = now;
        return permission.state;
      }

      this.permissionCache = "granted"; // Assume granted if permissions API not available
      this.permissionCacheTime = now;
      return this.permissionCache;
    } catch (error) {
      console.error("Error requesting location permission:", error);
      this.permissionCache = "denied";
      this.permissionCacheTime = Date.now();
      return "denied";
    }
  }

  /**
   * Get geolocation options based on settings (memoized)
   */
  getGeolocationOptions() {
    return getGeolocationOptions(this.settings.accuracyLevel);
  }

  /**
   * Handle successful location retrieval
   */
  async handleLocationSuccess(position) {
    const locationData = await this.processLocationData(position);
    this.currentLocation = locationData;

    if (this.settings.enableLocationHistory) {
      this.addToLocationHistory(locationData);
    }

    if (this.settings.enableAnalytics) {
      this.updateAnalytics(locationData);
    }

    // Trigger location update event
    this.dispatchLocationEvent("locationUpdate", locationData);
  }

  /**
   * Handle location retrieval errors with memoized error messages
   */
  handleLocationError(error) {
    const errorMessages = {
      [1]: "Location access denied by user", // PERMISSION_DENIED
      [2]: "Location information unavailable", // POSITION_UNAVAILABLE
      [3]: "Location request timed out", // TIMEOUT
      "Location permission denied": "Location access denied by user",
    };

    const errorMessage =
      errorMessages[error.code] ||
      errorMessages[error.message] ||
      error.message ||
      "Location error occurred";

    console.error("Location error:", errorMessage);
    this.dispatchLocationEvent("locationError", {
      error: errorMessage,
      code: error.code,
    });

    // Try fallback methods
    this.tryFallbackLocation();
  }

  /**
   * Process and privacy-filter location data
   */
  async processLocationData(position) {
    const { latitude, longitude, accuracy, altitude, heading, speed } =
      position.coords;
    const timestamp = new Date(position.timestamp).toISOString();

    let processedData = {
      timestamp,
      accuracy,
      source: "gps",
      collectedAt: new Date().toISOString(),
    };

    // Apply privacy filtering
    switch (this.settings.privacyLevel) {
      case PRIVACY_LEVELS.EXACT:
        processedData = {
          ...processedData,
          latitude,
          longitude,
          altitude,
          heading,
          speed,
        };
        break;

      case PRIVACY_LEVELS.APPROXIMATE:
        processedData = {
          ...processedData,
          latitude: this.roundCoordinate(latitude, 3), // ~111m accuracy
          longitude: this.roundCoordinate(longitude, 3),
          altitude: altitude ? Math.round(altitude / 10) * 10 : null,
        };
        break;

      case PRIVACY_LEVELS.CITY_LEVEL:
        processedData = {
          ...processedData,
          latitude: this.roundCoordinate(latitude, 1), // ~11km accuracy
          longitude: this.roundCoordinate(longitude, 1),
        };
        break;

      case PRIVACY_LEVELS.COUNTRY_LEVEL:
        // Only store country-level data
        processedData = {
          ...processedData,
          country: await this.getCountryFromCoordinates(latitude, longitude),
        };
        break;

      case PRIVACY_LEVELS.ANONYMOUS:
        // No coordinate data, only metadata
        processedData = {
          timestamp,
          source: "gps",
          collectedAt: new Date().toISOString(),
        };
        break;
    }

    return processedData;
  }

  /**
   * Round coordinates for privacy (optimized with lookup table)
   */
  roundCoordinate(coord, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(coord * factor) / factor;
  }

  /**
   * Add location data to history with size management
   */
  addToLocationHistory(locationData) {
    this.locationHistory.push(locationData);

    // Limit history size efficiently
    const maxSize = 1000;
    if (this.locationHistory.length > maxSize) {
      // Remove from beginning in chunks for better performance
      const removeCount = Math.min(200, this.locationHistory.length - maxSize);
      this.locationHistory.splice(0, removeCount);
    }

    this.saveLocationHistory();
  }

  /**
   * Try fallback location methods
   */
  async tryFallbackLocation() {
    try {
      // Try IP-based location
      const ipLocation = await this.getIPBasedLocation();
      if (ipLocation) {
        this.handleLocationSuccess({
          coords: ipLocation,
          timestamp: Date.now(),
        });
      }
    } catch (error) {
      console.error("Fallback location methods failed:", error);
    }
  }

  /**
   * Get IP-based location
   */
  async getIPBasedLocation() {
    try {
      // Using a free IP geolocation service
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      if (data.latitude && data.longitude) {
        return {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          accuracy: 10000, // IP location is typically less accurate
          city: data.city,
          region: data.region,
          country: data.country_name,
          source: "ip",
        };
      }
    } catch (error) {
      console.error("IP-based location failed:", error);
    }
    return null;
  }

  /**
   * Get country from coordinates (reverse geocoding)
   */
  async getCountryFromCoordinates(lat, lng) {
    try {
      // This would typically use a geocoding service
      // For demo purposes, return a placeholder
      return "Unknown Country";
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      return "Unknown Country";
    }
  }

  /**
   * Update analytics data with memoization
   */
  updateAnalytics(locationData) {
    this.analyticsData.totalLocations =
      (this.analyticsData.totalLocations || 0) + 1;
    this.analyticsData.lastLocation = locationData;
    this.analyticsData.lastUpdated = new Date().toISOString();

    // Calculate distance traveled if we have previous location
    const historyLength = this.locationHistory.length;
    if (historyLength > 0) {
      const lastLocation = this.locationHistory[historyLength - 1];
      if (
        lastLocation.latitude &&
        lastLocation.longitude &&
        locationData.latitude &&
        locationData.longitude
      ) {
        const distance = this.calculateDistance(
          lastLocation.latitude,
          lastLocation.longitude,
          locationData.latitude,
          locationData.longitude
        );

        this.analyticsData.totalDistance =
          (this.analyticsData.totalDistance || 0) + distance;
      }
    }
  }

  /**
   * Calculate distance between two coordinates (optimized Haversine formula)
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const dLat = (lat2 - lat1) * RADIAN_CONVERSION;
    const dLon = (lon2 - lon1) * RADIAN_CONVERSION;
    const lat1Rad = lat1 * RADIAN_CONVERSION;
    const lat2Rad = lat2 * RADIAN_CONVERSION;

    const a =
      Math.sin(dLat * 0.5) * Math.sin(dLat * 0.5) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(dLon * 0.5) *
        Math.sin(dLon * 0.5);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS_KM * c; // Distance in kilometers
  }

  /**
   * Dispatch location events with event pooling
   */
  dispatchLocationEvent(eventType, data) {
    const eventName = `locationData${eventType}`;

    // Reuse event objects to reduce GC pressure
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, new CustomEvent(eventName));
    }

    const event = this.eventListeners.get(eventName);
    // Create new event with updated detail
    const newEvent = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(newEvent);
  }

  /**
   * Setup event listeners with cleanup tracking
   */
  setupEventListeners() {
    const visibilityHandler = () => {
      if (document.hidden && this.settings.backgroundTracking === false) {
        this.stopLocationTracking();
      } else if (!document.hidden && this.settings.collectionEnabled) {
        this.startLocationTracking();
      }
    };

    document.addEventListener("visibilitychange", visibilityHandler, {
      passive: true,
    });

    // Store reference for cleanup
    this._visibilityHandler = visibilityHandler;
  }

  /**
   * Cleanup event listeners
   */
  cleanup() {
    if (this._visibilityHandler) {
      document.removeEventListener("visibilitychange", this._visibilityHandler);
      this._visibilityHandler = null;
    }

    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }

    this.stopLocationTracking();
    this.eventListeners.clear();
  }

  /**
   * Clean up expired location data with batch processing
   */
  cleanupExpiredData() {
    if (!this.settings.retentionPeriod) return;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.settings.retentionPeriod);
    const cutoffTime = cutoffDate.getTime();

    let i = 0;
    const originalLength = this.locationHistory.length;

    // Find first valid entry
    while (
      i < originalLength &&
      new Date(this.locationHistory[i].collectedAt).getTime() <= cutoffTime
    ) {
      i++;
    }

    // Remove expired entries in one operation
    if (i > 0) {
      this.locationHistory.splice(0, i);
      this.saveLocationHistory();
    }
  }

  /**
   * Export location data
   */
  exportData(format = "json") {
    const exportData = {
      settings: this.settings,
      locationHistory: this.locationHistory,
      currentLocation: this.currentLocation,
      analyticsData: this.analyticsData,
      consentRecords: this.consentRecords,
      exportedAt: new Date().toISOString(),
      version: "1.0",
    };

    switch (format) {
      case "json":
        return JSON.stringify(exportData, null, 2);
      case "csv":
        return this.convertLocationsToCsv(this.locationHistory);
      case "gpx":
        return this.convertToGpx(this.locationHistory);
      default:
        return exportData;
    }
  }

  /**
   * Convert locations to CSV format
   */
  convertLocationsToCsv(locations) {
    if (locations.length === 0) return "";

    const headers = [
      "timestamp",
      "latitude",
      "longitude",
      "accuracy",
      "source",
    ];
    const csvData = locations.map((location) =>
      headers.map((header) => location[header] || "").join(",")
    );

    return [headers.join(","), ...csvData].join("\n");
  }

  /**
   * Convert locations to GPX format
   */
  convertToGpx(locations) {
    const gpxHeader = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="LocationDataCollector">
  <trk>
    <name>Location History</name>
    <trkseg>`;

    const gpxFooter = `    </trkseg>
  </trk>
</gpx>`;

    const trackPoints = locations
      .filter((location) => location.latitude && location.longitude)
      .map(
        (location) =>
          `      <trkpt lat="${location.latitude}" lon="${location.longitude}">
        <time>${location.timestamp}</time>
      </trkpt>`
      )
      .join("\n");

    return gpxHeader + "\n" + trackPoints + "\n" + gpxFooter;
  }

  /**
   * Import location data
   */
  importData(data) {
    try {
      const importedData = typeof data === "string" ? JSON.parse(data) : data;

      if (importedData.settings) {
        this.settings = {
          ...DEFAULT_LOCATION_SETTINGS,
          ...importedData.settings,
        };
        this.saveSettings();
      }

      if (importedData.locationHistory) {
        this.locationHistory = importedData.locationHistory;
        this.saveLocationHistory();
      }

      if (importedData.consentRecords) {
        this.consentRecords = importedData.consentRecords;
        this.saveConsentRecords();
      }

      return true;
    } catch (error) {
      console.error("Error importing location data:", error);
      return false;
    }
  }

  /**
   * Clear all location data
   */
  clearAllData() {
    this.locationHistory = [];
    this.currentLocation = null;
    this.analyticsData = {};
    this.consentRecords = [];

    this.stopLocationTracking();

    localStorage.removeItem("locationDataHistory");
    localStorage.removeItem("locationDataConsent");
    localStorage.removeItem("locationDataSettings");

    this.saveLocationHistory();
    this.saveConsentRecords();
  }

  /**
   * Get location data summary
   */
  getDataSummary() {
    return {
      isTrackingEnabled: this.settings.collectionEnabled,
      isCurrentlyTracking: this.isTracking,
      totalLocations: this.locationHistory.length,
      currentLocation: this.currentLocation,
      lastUpdated: this.settings.lastUpdated,
      privacyLevel: this.settings.privacyLevel,
      retentionPeriod: this.settings.retentionPeriod,
      analyticsEnabled: this.settings.enableAnalytics,
      totalDistance: this.analyticsData.totalDistance || 0,
    };
  }

  /**
   * Get privacy compliance status
   */
  getPrivacyCompliance() {
    return {
      hasConsent: this.consentRecords.length > 0,
      consentTimestamp: this.settings.consentTimestamp,
      dataMinimization: this.settings.privacyLevel !== PRIVACY_LEVELS.EXACT,
      dataRetention: this.settings.retentionPeriod <= 365,
      thirdPartySharing: !this.settings.shareWithThirdParties,
      anonymization: this.settings.anonymizeData,
      userControl: true, // User has control over all settings
    };
  }

  /**
   * Get current location (one-time request)
   */
  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }

      const options = this.getGeolocationOptions();

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const locationData = await this.processLocationData(position);
            resolve(locationData);
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(error);
        },
        options
      );
    });
  }

  /**
   * Get user IP address (helper method)
   */
  getUserIPAddress() {
    // This would typically be obtained from a server-side API
    return "xxx.xxx.xxx.xxx";
  }
}

// ==============================
// REACT HOOK FOR LOCATION DATA
// ==============================

export const useLocationData = () => {
  const collectorRef = useRef(null);

  if (!collectorRef.current) {
    collectorRef.current = new LocationDataCollector();
  }

  const collector = collectorRef.current;

  const [settings, setSettings] = useState(DEFAULT_LOCATION_SETTINGS);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeCollector = async () => {
      try {
        setIsLoading(true);
        await collector.initialize();
        setSettings(collector.settings);
        setCurrentLocation(collector.currentLocation);
        setIsTracking(collector.isTracking);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCollector();

    // Setup event listeners with cleanup
    const handleLocationUpdate = (event) => {
      setCurrentLocation(event.detail);
    };

    const handleLocationError = (event) => {
      setError(event.detail.error);
    };

    window.addEventListener(
      "locationDataLocationUpdate",
      handleLocationUpdate,
      { passive: true }
    );
    window.addEventListener("locationDataLocationError", handleLocationError, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "locationDataLocationUpdate",
        handleLocationUpdate
      );
      window.removeEventListener(
        "locationDataLocationError",
        handleLocationError
      );
      collector.cleanup();
    };
  }, []); // Remove collector dependency to prevent recreation

  const updateSettings = useCallback((newSettings) => {
    collector.updateSettings(newSettings);
    setSettings(collector.settings);
    setIsTracking(collector.isTracking);
  }, []); // Remove collector dependency

  const startTracking = useCallback(async () => {
    try {
      await collector.startLocationTracking();
      setIsTracking(collector.isTracking);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []); // Remove collector dependency

  const stopTracking = useCallback(() => {
    collector.stopLocationTracking();
    setIsTracking(collector.isTracking);
  }, []); // Remove collector dependency

  const getCurrentLocation = useCallback(async () => {
    try {
      const location = await collector.getCurrentLocation();
      setCurrentLocation(location);
      return location;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []); // Remove collector dependency

  // Memoize functions that don't need re-creation
  const exportData = useCallback((format = "json") => {
    return collector.exportData(format);
  }, []); // Remove collector dependency

  const importData = useCallback((data) => {
    const success = collector.importData(data);
    if (success) {
      setSettings(collector.settings);
      setCurrentLocation(collector.currentLocation);
    }
    return success;
  }, []); // Remove collector dependency

  const clearAllData = useCallback(() => {
    collector.clearAllData();
    setSettings(collector.settings);
    setCurrentLocation(null);
    setIsTracking(false);
  }, []); // Remove collector dependency

  const getDataSummary = useCallback(() => {
    return collector.getDataSummary();
  }, []); // Remove collector dependency

  const getPrivacyCompliance = useCallback(() => {
    return collector.getPrivacyCompliance();
  }, []); // Remove collector dependency

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      settings,
      currentLocation,
      isTracking,
      isLoading,
      error,
      updateSettings,
      startTracking,
      stopTracking,
      getCurrentLocation,
      exportData,
      importData,
      clearAllData,
      getDataSummary,
      getPrivacyCompliance,
      collector,
    }),
    [
      settings,
      currentLocation,
      isTracking,
      isLoading,
      error,
      updateSettings,
      startTracking,
      stopTracking,
      getCurrentLocation,
      exportData,
      importData,
      clearAllData,
      getDataSummary,
      getPrivacyCompliance,
    ]
  );
};

// ==============================
// EXPORTS
// ==============================

export {
  LocationDataCollector,
  LOCATION_ACCURACY_LEVELS,
  LOCATION_DATA_TYPES,
  COLLECTION_METHODS,
  PRIVACY_LEVELS,
  DEFAULT_LOCATION_SETTINGS,
};

export default LocationDataCollector;
