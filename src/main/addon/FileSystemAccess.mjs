import Base      from '../../../node_modules/neo.mjs/src/core/Base.mjs';

/**
 * Basic CRUD support for Chrome File System Access API
 * @class Neo.main.addon.FileSystemAccess
 * @extends Neo.core.Base
 * @singleton
 */
class FileSystemAccess extends Base {
    static config = {
        /**
         * @member {String} className='Neo.main.addon.FileSystemAccess'
         * @protected
         */
        className: 'Neo.main.addon.FileSystemAccess',
        /**
         * Remote method access for other workers
         * @member {Object} remote={app: [//...]}
         * @protected
         */
        remote: {
            app: [
                'openFilePicker',
                'saveFilePicker',
                'directoryPicker',
            ]
        },
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true
    }

    openFilePicker(opts) {
       return window.showOpenFilePicker(opts);
    }
    
    saveFilePicker(opts) {
       return window.showSaveFilePicker(opts);
    }

    directoryPicker(optd) {
       return window.showDirectoryPicker(opts);
    }

}

let instance = Neo.applyClassConfig(FileSystemAccess);

export default instance;
