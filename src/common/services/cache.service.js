class CacheService {
    /* @ngInject */ 
    constructor($q, $cacheFactory) {
        Object.assign(this, { $q, $cacheFactory });
        this.memoryCache = null;
        this.storageCache = null;
    }

    // Check to make sure the cache doesn't already exist
    getMemoryCache(minute) {
        minute = minute || 30;
        var cacheName = 'memoryCache_' + minute;
        if (!this.$cacheFactory.get(cacheName)) {
            this.memoryCache = this.$cacheFactory(cacheName, {
                storageMode: 'memory',
                deleteOnExpire: 'aggressive',
                maxAge: 60 * 1000 * minute
            });
        };
        return this.memoryCache;
    }

    getStorageCache(minute) {
        minute = minute || 30;
        var cacheName = 'storageCache_' + minute;
        if (!$cacheFactory.get(cacheName)) {
            this.storageCache = this.$cacheFactory(cacheName, {
                storageMode: 'localStorage',
                deleteOnExpire: 'aggressive',
                maxAge: 60 * 1000 * minute
            });
        };
        return this.storageCache;
    }

    getMemory(cacheKey) {
        var memoryCache = this.getMemoryCache();
        return memoryCache.get(cacheKey);
    }

    getQMemory(cacheKey) {
        var memoryCache = this.getMemoryCache();
        return this.$q((resolve) => resolve(memoryCache.get(cacheKey)));
    }

    putMemory(cacheKey, value, timeExpireInMinute) {
        var memoryCache = this.getMemoryCache(timeExpireInMinute);
        return memoryCache.put(cacheKey, value);
    }

    getStorage(cacheKey) {
        var storageCache = this.getStorageCache();
        return storageCache.get(cacheKey);        
    }

    getQStorage(cacheKey) {
        var storageCache = this.getStorageCache();
        return this.$q((resolve) => resolve(storageCache.get(cacheKey)));        
    }

    putStorage(cacheKey, value) {
        var storageCache = this.getStorageCache();
        return storageCache.put(cacheKey, value);
    }

    putStorage(cacheKey, value, timeExpireInMinute) {
        var storageCache = this.getStorageCache(timeExpireInMinute);
        return storageCache.put(cacheKey, value);
    }

    buildCacheKey(methodName, params) {
        var cacheKey = methodName;
        for (var key in params) {
            if (params.hasOwnProperty(key)){
                cacheKey += '_' + key + '_' + params[key];
            }
        }
        return cacheKey;
    }
}

export default CacheService;