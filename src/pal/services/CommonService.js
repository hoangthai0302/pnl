class CommonService {
	/* @ngInject */
	constructor(ApiService, appConfig, CacheService, Util, $q) {
		this.api = ApiService;
		this.path = 'WebService/CommonService.asmx/';
		Object.assign(this, {			
			appConfig,
			CacheService,
			Util,
			$q
		})
	}

	loadCodeList(masterCode, defaultOptionText) {
		var cacheKey = this.CacheService.buildCacheKey('loadCodeList', masterCode, defaultOptionText);
		return this.CacheService.getQMemory(cacheKey).then(valueCached => {
			if (!valueCached) {
				return this.api.post(this.path + 'loadCodeList', {
					masterCode
				}).then(codeList => {
					if (defaultOptionText) {
						codeList.splice(0, 0, defaultOptionText);
					}
					valueCached = codeList;
					this.CacheService.putMemory(cacheKey, valueCached)
					return valueCached;
				});
			} else
				return valueCached;
		})
	}

	accessLog(url, queryString) {
		const browser = window.navigator.appName;
		const browserVersion = window.navigator.appVersion;
		return this.api.post(this.path + 'loadCodeList', {
			url,
			queryString,
			browser,
			browserVersion
		});
	}

	getUserRole(userId) {
		return this.api.post(this.path + 'getUserRole', {
			userId
		});
	}

	getUserMenu() {
		return this.api.post(this.path + 'getUserMenu');
	}

}
