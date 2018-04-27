class CommonService {
	/* @ngInject */
	constructor(ApiService, appConfig, CacheService, $q) {
		this.api = ApiService;
		this.path = 'GPWeb/WebService/MarketingZone/CommonService.asmx/';
		Object.assign(this, {			
			appConfig,
			CacheService,
			$q
		})
	}

	loadCodeList(masterCode, defaultOptionText) {
		var cacheKey = this.CacheService.buildCacheKey('LoadCodeList', masterCode, defaultOptionText);
		return this.CacheService.getQMemory(cacheKey).then(valueCached => {
			if (!valueCached) {
				return this.api.post(this.path + 'LoadCodeList', {
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

export default CommonService;
