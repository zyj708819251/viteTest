
	let root = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window
		.location.port : '')
	export default {
		// url配置
		pageUrl: root,
		baseUrl: window.location.hostname == 'localhost'?'http://43.143.246.52/prod-api':root + '/prod-api',
		fileUrl: window.location.hostname=='localhost'?'http://43.143.246.52':window.location.protocol + "//" + window.location.hostname,
		wsUrl:window.location.hostname=='localhost'?'ws://43.143.246.52/prod-api': "ws://" + window.location.hostname+'/prod-api',
		// 控件大小
		size: 'small',
		// 权限
		
		hasPermi:(key)=> {
		    var permissions = sessionStorage.getItem('permissions');
		    if (permissions) {
		        if (permissions == '["*:*:*"]') {
		            return true;
		        } else {
		            const permissionsArr = JSON.parse(permissions);
		            if (permissionsArr.includes(key)) {
		                return true;
		            } else {
		                return false;
		            }
		        }
		    } else {
		        return true;
		    }
		}
	};