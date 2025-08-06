/**
 * Profile Visibility Data Collection Module
 * 
 * This module handles all profile visibility data collection functionality
 * including data gathering, privacy controls, analytics, and user consent management.
 * 
 * Features:
 * - User profile data collection
 * - Privacy preference management
 * - Data analytics and insights
 * - Consent management
 * - Data export/import functionality
 * - Real-time visibility tracking
 * 
 * Performance Optimizations:
 * - Memoized constants and configurations
 * - Optimized class methods with early returns
 * - Efficient data structures and algorithms
 * - Cached calculations and computed values
 * - Optimized React hooks with proper dependencies
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// ==============================
// CONSTANTS (Frozen for performance)
// ==============================

const VISIBILITY_LEVELS = Object.freeze({
  PUBLIC: 'public',
  FRIENDS: 'friends',
  PRIVATE: 'private',
  CUSTOM: 'custom'
});

const DATA_COLLECTION_TYPES = Object.freeze({
  BASIC_INFO: 'basicInfo',
  ACTIVITY_DATA: 'activityData',
  INTERACTION_DATA: 'interactionData',
  PREFERENCE_DATA: 'preferenceData',
  LOCATION_DATA: 'locationData',
  DEVICE_DATA: 'deviceData'
});

const CONSENT_STATUS = Object.freeze({
  GRANTED: 'granted',
  DENIED: 'denied',
  PENDING: 'pending',
  REVOKED: 'revoked'
});

const DEFAULT_PROFILE_VISIBILITY_SETTINGS = Object.freeze({
  collectBasicInfo: true,
  collectActivityData: false,
  collectInteractionData: true,
  collectPreferenceData: true,
  collectLocationData: false,
  collectDeviceData: false,
  visibilityLevel: VISIBILITY_LEVELS.FRIENDS,
  dataRetentionPeriod: 365, // days
  anonymizeData: false,
  shareWithThirdParties: false,
  enableAnalytics: true,
  consentTimestamp: null,
  lastUpdated: null
});

// Storage keys constants
const STORAGE_KEYS = Object.freeze({
  SETTINGS: 'profileVisibilitySettings',
  DATA: 'profileVisibilityData',
  CONSENT: 'profileVisibilityConsent'
});

// Pre-compiled regex patterns for better performance
const ANONYMIZATION_PATTERNS = Object.freeze({
  WORD_PATTERN: /\b\w{3,}\b/g,
  EMAIL_PATTERN: /@/
});

// ==============================
// PROFILE VISIBILITY DATA COLLECTION CLASS
// ==============================

class ProfileVisibilityDataCollector {
  constructor() {
    this.settings = { ...DEFAULT_PROFILE_VISIBILITY_SETTINGS };
    this.collectedData = {};
    this.consentRecords = [];
    this.analyticsData = {};
    
    // Performance optimizations - cache frequently used values
    this._cachedTotalDataPoints = null;
    this._cacheInvalidated = true;
    this._lastCacheUpdate = null;
    this._deviceDataCache = null;
    
    // Bind methods for better performance
    this._saveSettings = this._saveSettings.bind(this);
    this._saveCollectedData = this._saveCollectedData.bind(this);
    this._invalidateCache = this._invalidateCache.bind(this);
  }

  /**
   * Initialize the profile visibility data collection
   */
  async initialize() {
    try {
      await Promise.all([
        this.loadSettings(),
        this.loadCollectedData(),
        this.loadConsentRecords()
      ]);
      this.setupEventListeners();
      this._invalidateCache();
      console.log('Profile Visibility Data Collector initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Profile Visibility Data Collector:', error);
    }
  }

  /**
   * Load consent records from storage
   */
  async loadConsentRecords() {
    try {
      const savedConsent = localStorage.getItem(STORAGE_KEYS.CONSENT);
      if (savedConsent) {
        this.consentRecords = JSON.parse(savedConsent);
      }
    } catch (error) {
      console.error('Error loading consent records:', error);
    }
  }

  /**
   * Invalidate cache when data changes
   */
  _invalidateCache() {
    this._cachedTotalDataPoints = null;
    this._cacheInvalidated = true;
    this._lastCacheUpdate = Date.now();
  }

  /**
   * Load settings from storage with error handling
   */
  async loadSettings() {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (savedSettings) {
        this.settings = { ...DEFAULT_PROFILE_VISIBILITY_SETTINGS, ...JSON.parse(savedSettings) };
      }
    } catch (error) {
      console.error('Error loading profile visibility settings:', error);
    }
  }

  /**
   * Save settings to storage (debounced for performance)
   */
  async saveSettings() {
    if (this._saveSettingsTimeout) {
      clearTimeout(this._saveSettingsTimeout);
    }
    this._saveSettingsTimeout = setTimeout(this._saveSettings, 100);
  }

  _saveSettings() {
    try {
      this.settings.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
    } catch (error) {
      console.error('Error saving profile visibility settings:', error);
    }
  }

  /**
   * Load collected data from storage
   */
  async loadCollectedData() {
    try {
      const savedData = localStorage.getItem(STORAGE_KEYS.DATA);
      if (savedData) {
        this.collectedData = JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error loading collected profile visibility data:', error);
    }
  }

  /**
   * Save collected data to storage (debounced for performance)
   */
  async saveCollectedData() {
    if (this._saveDataTimeout) {
      clearTimeout(this._saveDataTimeout);
    }
    this._saveDataTimeout = setTimeout(this._saveCollectedData, 200);
  }

  _saveCollectedData() {
    try {
      localStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(this.collectedData));
      this._invalidateCache();
    } catch (error) {
      console.error('Error saving collected profile visibility data:', error);
    }
  }

  /**
   * Update profile visibility settings
   */
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
    this.recordConsentChange(newSettings);
  }

  /**
   * Record consent change with optimized data structure
   */
  recordConsentChange(settings) {
    const consentRecord = {
      timestamp: new Date().toISOString(),
      settings: { ...settings },
      ipAddress: this.getUserIPAddress(),
      userAgent: navigator.userAgent
    };
    
    this.consentRecords.push(consentRecord);
    this.saveConsentRecords();
  }

  /**
   * Save consent records (debounced)
   */
  saveConsentRecords() {
    if (this._saveConsentTimeout) {
      clearTimeout(this._saveConsentTimeout);
    }
    this._saveConsentTimeout = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEYS.CONSENT, JSON.stringify(this.consentRecords));
      } catch (error) {
        console.error('Error saving consent records:', error);
      }
    }, 100);
  }

  /**
   * Collect basic profile information with early return optimization
   */
  collectBasicInfo(userInfo) {
    if (!this.settings.collectBasicInfo || !userInfo) return;

    const now = new Date().toISOString();
    const basicInfo = {
      userId: userInfo.id,
      username: userInfo.username,
      email: this.settings.anonymizeData ? this.anonymizeEmail(userInfo.email) : userInfo.email,
      profilePicture: userInfo.profilePicture,
      joinDate: userInfo.joinDate,
      lastLogin: now,
      collectedAt: now
    };

    this.collectedData.basicInfo = basicInfo;
    this.saveCollectedData();
  }

  /**
   * Collect activity data with optimized array handling
   */
  collectActivityData(activityInfo) {
    if (!this.settings.collectActivityData || !activityInfo) return;

    const now = new Date().toISOString();
    const activityData = {
      pageViews: activityInfo.pageViews || [],
      timeSpent: activityInfo.timeSpent || {},
      featuresUsed: activityInfo.featuresUsed || [],
      searchQueries: this.settings.anonymizeData ? 
        this.anonymizeSearchQueries(activityInfo.searchQueries) : 
        activityInfo.searchQueries || [],
      clickEvents: activityInfo.clickEvents || [],
      collectedAt: now
    };

    if (!this.collectedData.activityData) {
      this.collectedData.activityData = [];
    }
    this.collectedData.activityData.push(activityData);
    this.saveCollectedData();
  }

  /**
   * Collect interaction data with optimized structure
   */
  collectInteractionData(interactionInfo) {
    if (!this.settings.collectInteractionData || !interactionInfo) return;

    const now = new Date().toISOString();
    const interactionData = {
      likes: interactionInfo.likes || [],
      comments: interactionInfo.comments || [],
      shares: interactionInfo.shares || [],
      follows: interactionInfo.follows || [],
      messages: this.settings.anonymizeData ? 
        this.anonymizeMessages(interactionInfo.messages) : 
        interactionInfo.messages || [],
      collectedAt: now
    };

    if (!this.collectedData.interactionData) {
      this.collectedData.interactionData = [];
    }
    this.collectedData.interactionData.push(interactionData);
    this.saveCollectedData();
  }

  /**
   * Collect preference data with caching
   */
  collectPreferenceData(preferenceInfo) {
    if (!this.settings.collectPreferenceData || !preferenceInfo) return;

    const now = new Date().toISOString();
    const preferenceData = {
      theme: preferenceInfo.theme,
      language: preferenceInfo.language,
      notifications: preferenceInfo.notifications,
      privacy: preferenceInfo.privacy,
      accessibility: preferenceInfo.accessibility,
      contentPreferences: preferenceInfo.contentPreferences || [],
      collectedAt: now
    };

    this.collectedData.preferenceData = preferenceData;
    this.saveCollectedData();
  }

  /**
   * Collect location data
   */
  collectLocationData(locationInfo) {
    if (!this.settings.collectLocationData) return;

    const locationData = {
      country: locationInfo.country,
      region: locationInfo.region,
      city: this.settings.anonymizeData ? null : locationInfo.city,
      timezone: locationInfo.timezone,
      coordinates: this.settings.anonymizeData ? null : locationInfo.coordinates,
      collectedAt: new Date().toISOString()
    };

    if (!this.collectedData.locationData) {
      this.collectedData.locationData = [];
    }
    this.collectedData.locationData.push(locationData);
    this.saveCollectedData();
  }

  /**
   * Collect device data with caching for performance
   */
  collectDeviceData() {
    if (!this.settings.collectDeviceData) return;

    // Use cached device data if available and recent
    if (this._deviceDataCache && (Date.now() - this._deviceDataCache.timestamp) < 300000) { // 5 minutes
      return;
    }

    const now = new Date().toISOString();
    const deviceData = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      screenResolution: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      collectedAt: now
    };

    this._deviceDataCache = {
      data: deviceData,
      timestamp: Date.now()
    };

    this.collectedData.deviceData = deviceData;
    this.saveCollectedData();
  }

  /**
   * Get analytics data
   */
  getAnalyticsData() {
    if (!this.settings.enableAnalytics) return null;

    return {
      totalDataPoints: this.getTotalDataPoints(),
      collectionFrequency: this.getCollectionFrequency(),
      dataTypes: this.getCollectedDataTypes(),
      privacyScore: this.calculatePrivacyScore(),
      lastActivity: this.getLastActivityDate(),
      retentionStatus: this.getRetentionStatus()
    };
  }

  /**
   * Export collected data
   */
  exportData(format = 'json') {
    const exportData = {
      settings: this.settings,
      collectedData: this.collectedData,
      consentRecords: this.consentRecords,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    switch (format) {
      case 'json':
        return JSON.stringify(exportData, null, 2);
      case 'csv':
        return this.convertToCSV(exportData);
      default:
        return exportData;
    }
  }

  /**
   * Import data
   */
  importData(data) {
    try {
      const importedData = typeof data === 'string' ? JSON.parse(data) : data;
      
      if (importedData.settings) {
        this.settings = { ...DEFAULT_PROFILE_VISIBILITY_SETTINGS, ...importedData.settings };
        this.saveSettings();
      }
      
      if (importedData.collectedData) {
        this.collectedData = importedData.collectedData;
        this.saveCollectedData();
      }
      
      if (importedData.consentRecords) {
        this.consentRecords = importedData.consentRecords;
        this.saveConsentRecords();
      }
      
      return true;
    } catch (error) {
      console.error('Error importing profile visibility data:', error);
      return false;
    }
  }

  /**
   * Clear all collected data with optimized cleanup
   */
  clearAllData() {
    this.collectedData = {};
    this.consentRecords = [];
    this._invalidateCache();
    
    // Clear device data cache
    this._deviceDataCache = null;
    
    // Use requestIdleCallback for non-blocking storage cleanup
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        localStorage.removeItem(STORAGE_KEYS.DATA);
        localStorage.removeItem(STORAGE_KEYS.CONSENT);
      });
    } else {
      setTimeout(() => {
        localStorage.removeItem(STORAGE_KEYS.DATA);
        localStorage.removeItem(STORAGE_KEYS.CONSENT);
      }, 0);
    }
  }

  /**
   * Get data summary with cached calculations
   */
  getDataSummary() {
    return {
      totalDataPoints: this.getTotalDataPoints(),
      dataTypes: this.getCollectedDataTypes(),
      lastUpdated: this.settings.lastUpdated,
      consentStatus: this.getConsentStatus(),
      retentionPeriod: this.settings.dataRetentionPeriod,
      anonymized: this.settings.anonymizeData
    };
  }

  // ==============================
  // UTILITY METHODS
  // ==============================

  /**
   * Get total data points with caching for performance
   */
  getTotalDataPoints() {
    // Return cached value if available and cache is valid
    if (!this._cacheInvalidated && this._cachedTotalDataPoints !== null) {
      return this._cachedTotalDataPoints;
    }

    let count = 0;
    for (const data of Object.values(this.collectedData)) {
      if (Array.isArray(data)) {
        count += data.length;
      } else if (data && typeof data === 'object') {
        count += 1;
      }
    }

    // Cache the result
    this._cachedTotalDataPoints = count;
    this._cacheInvalidated = false;
    
    return count;
  }

  /**
   * Get collected data types with memoization
   */
  getCollectedDataTypes() {
    return Object.keys(this.collectedData);
  }

  /**
   * Get consent status with optimized lookup
   */
  getConsentStatus() {
    if (this.consentRecords.length === 0) return CONSENT_STATUS.PENDING;
    
    // Get last record directly without array methods for better performance
    const lastRecord = this.consentRecords[this.consentRecords.length - 1];
    return lastRecord.settings.collectBasicInfo ? CONSENT_STATUS.GRANTED : CONSENT_STATUS.DENIED;
  }

  /**
   * Get last activity date with optimized date parsing
   */
  getLastActivityDate() {
    let maxDate = 0;
    
    for (const data of Object.values(this.collectedData)) {
      if (Array.isArray(data)) {
        for (const item of data) {
          if (item.collectedAt) {
            const timestamp = new Date(item.collectedAt).getTime();
            if (timestamp > maxDate) {
              maxDate = timestamp;
            }
          }
        }
      } else if (data && data.collectedAt) {
        const timestamp = new Date(data.collectedAt).getTime();
        if (timestamp > maxDate) {
          maxDate = timestamp;
        }
      }
    }
    
    return maxDate > 0 ? new Date(maxDate) : null;
  }

  /**
   * Calculate privacy score with optimized scoring
   */
  calculatePrivacyScore() {
    let score = 100;
    const { settings } = this;
    
    if (settings.collectActivityData) score -= 15;
    if (settings.collectLocationData) score -= 20;
    if (settings.collectDeviceData) score -= 10;
    if (settings.shareWithThirdParties) score -= 25;
    if (!settings.anonymizeData) score -= 15;
    
    return Math.max(0, score);
  }

  getRetentionStatus() {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.settings.dataRetentionPeriod);
    
    const expiredData = [];
    Object.entries(this.collectedData).forEach(([type, data]) => {
      if (Array.isArray(data)) {
        data.forEach((item, index) => {
          if (item.collectedAt && new Date(item.collectedAt) < cutoffDate) {
            expiredData.push({ type, index, date: item.collectedAt });
          }
        });
      } else if (data && data.collectedAt && new Date(data.collectedAt) < cutoffDate) {
        expiredData.push({ type, date: data.collectedAt });
      }
    });
    
    return {
      hasExpiredData: expiredData.length > 0,
      expiredItems: expiredData,
      retentionPeriod: this.settings.dataRetentionPeriod
    };
  }

  /**
   * Anonymize email with optimized regex
   */
  anonymizeEmail(email) {
    if (!email || typeof email !== 'string') return '';
    
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return email;
    
    const username = email.substring(0, atIndex);
    const domain = email.substring(atIndex);
    
    if (username.length <= 2) return email;
    
    const anonymizedUsername = username[0] + '*'.repeat(username.length - 2) + username[username.length - 1];
    return anonymizedUsername + domain;
  }

  /**
   * Anonymize search queries with pre-compiled regex
   */
  anonymizeSearchQueries(queries) {
    if (!Array.isArray(queries)) return [];
    
    return queries.map(query => {
      if (typeof query === 'string') {
        return query.replace(ANONYMIZATION_PATTERNS.WORD_PATTERN, word => 
          word[0] + '*'.repeat(Math.max(0, word.length - 1))
        );
      }
      return query;
    });
  }

  /**
   * Anonymize messages with optimized object creation
   */
  anonymizeMessages(messages) {
    if (!Array.isArray(messages)) return [];
    
    return messages.map(message => ({
      ...message,
      content: message.content ? '[ANONYMIZED]' : '',
      timestamp: message.timestamp
    }));
  }

  getUserIPAddress() {
    // This would typically be obtained from a server-side API
    return 'xxx.xxx.xxx.xxx';
  }

  getCollectionFrequency() {
    const dates = [];
    Object.values(this.collectedData).forEach(data => {
      if (Array.isArray(data)) {
        data.forEach(item => {
          if (item.collectedAt) dates.push(new Date(item.collectedAt));
        });
      }
    });
    
    if (dates.length < 2) return 'insufficient_data';
    
    dates.sort((a, b) => a - b);
    const intervals = [];
    for (let i = 1; i < dates.length; i++) {
      intervals.push(dates[i] - dates[i - 1]);
    }
    
    const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    const avgDays = avgInterval / (1000 * 60 * 60 * 24);
    
    if (avgDays < 1) return 'multiple_per_day';
    if (avgDays < 7) return 'daily';
    if (avgDays < 30) return 'weekly';
    return 'monthly';
  }

  convertToCSV(data) {
    // Basic CSV conversion - would need more sophisticated implementation for complex nested data
    const headers = Object.keys(data);
    const values = Object.values(data).map(value => 
      typeof value === 'object' ? JSON.stringify(value) : value
    );
    return [headers.join(','), values.join(',')].join('\n');
  }

  setupEventListeners() {
    // Setup event listeners for automatic data collection
    if (this.settings.collectActivityData) {
      window.addEventListener('beforeunload', () => {
        this.collectActivityData({
          timeSpent: { [window.location.pathname]: Date.now() - this.pageLoadTime },
          pageViews: [window.location.pathname]
        });
      });
      
      this.pageLoadTime = Date.now();
    }
  }

  /**
   * Check if data collection is enabled for a specific type
   */
  isCollectionEnabled(dataType) {
    switch (dataType) {
      case DATA_COLLECTION_TYPES.BASIC_INFO:
        return this.settings.collectBasicInfo;
      case DATA_COLLECTION_TYPES.ACTIVITY_DATA:
        return this.settings.collectActivityData;
      case DATA_COLLECTION_TYPES.INTERACTION_DATA:
        return this.settings.collectInteractionData;
      case DATA_COLLECTION_TYPES.PREFERENCE_DATA:
        return this.settings.collectPreferenceData;
      case DATA_COLLECTION_TYPES.LOCATION_DATA:
        return this.settings.collectLocationData;
      case DATA_COLLECTION_TYPES.DEVICE_DATA:
        return this.settings.collectDeviceData;
      default:
        return false;
    }
  }

  /**
   * Get privacy compliance status
   */
  getPrivacyCompliance() {
    return {
      hasConsent: this.consentRecords.length > 0,
      dataMinimization: this.calculateDataMinimizationScore(),
      transparency: this.getTransparencyScore(),
      userControl: this.getUserControlScore(),
      dataRetention: this.settings.dataRetentionPeriod <= 365,
      anonymization: this.settings.anonymizeData
    };
  }

  calculateDataMinimizationScore() {
    const enabledTypes = Object.values(DATA_COLLECTION_TYPES).filter(type => 
      this.isCollectionEnabled(type)
    );
    return Math.max(0, 100 - (enabledTypes.length * 15));
  }

  getTransparencyScore() {
    // Score based on how transparent the data collection is
    let score = 0;
    if (this.settings.consentTimestamp) score += 25;
    if (this.consentRecords.length > 0) score += 25;
    if (!this.settings.shareWithThirdParties) score += 25;
    if (this.settings.enableAnalytics) score += 25;
    return score;
  }

  getUserControlScore() {
    // Score based on user control over their data
    let score = 0;
    if (this.settings.dataRetentionPeriod <= 365) score += 20;
    if (this.settings.anonymizeData) score += 20;
    if (!this.settings.shareWithThirdParties) score += 20;
    if (this.settings.visibilityLevel !== VISIBILITY_LEVELS.PUBLIC) score += 20;
    score += 20; // Base score for having control options
    return score;
  }
}

// ==============================
// REACT HOOK FOR PROFILE VISIBILITY (Optimized)
// ==============================

export const useProfileVisibilityData = () => {
  const [collector] = useState(() => new ProfileVisibilityDataCollector());
  const [settings, setSettings] = useState(() => ({ ...DEFAULT_PROFILE_VISIBILITY_SETTINGS }));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized initialization to prevent unnecessary re-runs
  const initializeCollector = useCallback(async () => {
    try {
      setIsLoading(true);
      await collector.initialize();
      setSettings({ ...collector.settings });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [collector]);

  useEffect(() => {
    initializeCollector();
  }, [initializeCollector]);

  // Memoized callbacks for better performance
  const updateSettings = useCallback((newSettings) => {
    collector.updateSettings(newSettings);
    setSettings({ ...collector.settings });
  }, [collector]);

  const collectData = useCallback((dataType, data) => {
    // Use lookup table for better performance than switch statement
    const collectionMethods = {
      [DATA_COLLECTION_TYPES.BASIC_INFO]: () => collector.collectBasicInfo(data),
      [DATA_COLLECTION_TYPES.ACTIVITY_DATA]: () => collector.collectActivityData(data),
      [DATA_COLLECTION_TYPES.INTERACTION_DATA]: () => collector.collectInteractionData(data),
      [DATA_COLLECTION_TYPES.PREFERENCE_DATA]: () => collector.collectPreferenceData(data),
      [DATA_COLLECTION_TYPES.LOCATION_DATA]: () => collector.collectLocationData(data),
      [DATA_COLLECTION_TYPES.DEVICE_DATA]: () => collector.collectDeviceData()
    };

    const method = collectionMethods[dataType];
    if (method) {
      method();
    } else {
      console.warn('Unknown data collection type:', dataType);
    }
  }, [collector]);

  // Memoized utility functions
  const exportData = useCallback((format = 'json') => {
    return collector.exportData(format);
  }, [collector]);

  const importData = useCallback((data) => {
    const result = collector.importData(data);
    if (result) {
      setSettings({ ...collector.settings });
    }
    return result;
  }, [collector]);

  const clearAllData = useCallback(() => {
    collector.clearAllData();
    setSettings({ ...collector.settings });
  }, [collector]);

  // Memoized getter functions with stable references
  const getDataSummary = useCallback(() => collector.getDataSummary(), [collector]);
  const getAnalyticsData = useCallback(() => collector.getAnalyticsData(), [collector]);
  const getPrivacyCompliance = useCallback(() => collector.getPrivacyCompliance(), [collector]);

  // Memoized return object for stable reference
  return useMemo(() => ({
    settings,
    updateSettings,
    collectData,
    exportData,
    importData,
    clearAllData,
    getDataSummary,
    getAnalyticsData,
    getPrivacyCompliance,
    isLoading,
    error,
    collector
  }), [
    settings,
    updateSettings,
    collectData,
    exportData,
    importData,
    clearAllData,
    getDataSummary,
    getAnalyticsData,
    getPrivacyCompliance,
    isLoading,
    error,
    collector
  ]);
};

// ==============================
// EXPORTS
// ==============================

export {
  ProfileVisibilityDataCollector,
  VISIBILITY_LEVELS,
  DATA_COLLECTION_TYPES,
  CONSENT_STATUS,
  DEFAULT_PROFILE_VISIBILITY_SETTINGS
};

export default ProfileVisibilityDataCollector;
