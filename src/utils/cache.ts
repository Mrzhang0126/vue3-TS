// 1.boolean类型
class LocalCache {
  private _flag: boolean;

  constructor(flag: boolean) {
    this._flag = flag;
  }
  setCache(key: string, value: any) {
    if (this._flag) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  getCache(key: string) {
    if (this._flag) {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      return null;
    } else {
      const value = window.sessionStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      return null;
    }
  }

  removeCache(key: string) {
    if (this._flag) {
      window.localStorage.removeItem(key);
    } else {
      window.sessionStorage.removeItem(key);
    }
  }

  clearCache() {
    if (this._flag) {
      window.localStorage.clear();
    } else {
      window.sessionStorage.clear();
    }
  }
}

export default new LocalCache(true);

// 2.枚举类型
// enum StorageType {
//   LOCAL_STORAGE,
//   SESSION_STORAGE
// }

// class LocalCache {
//   private type: StorageType;

//   constructor(flag: StorageType) {
//     this.type = flag;
//   }
//   setCache(key: string, value: any) {
//     switch (this.type) {
//       case StorageType.LOCAL_STORAGE:
//         window.localStorage.setItem(key, JSON.stringify(value));
//         break;
//       case StorageType.SESSION_STORAGE:
//         window.sessionStorage.setItem(key, JSON.stringify(value));
//         break;
//       default:
//         break;
//     }
//   }

//   getCache(key: string) {
//     switch (this.type) {
//       case StorageType.LOCAL_STORAGE:
//         {
//           const value = window.localStorage.getItem(key);
//           if (value) {
//             return JSON.parse(value);
//           }
//           return null;
//         }
//         break;
//       case StorageType.SESSION_STORAGE:
//         {
//           const value = window.sessionStorage.getItem(key);
//           if (value) {
//             return JSON.parse(value);
//           }
//           return null;
//         }
//         break;
//       default:
//         break;
//     }
//   }

//   removeCache(key: string) {
//     switch (this.type) {
//       case StorageType.LOCAL_STORAGE:
//         window.localStorage.removeItem(key);
//         break;
//       case StorageType.SESSION_STORAGE:
//         window.sessionStorage.removeItem(key);
//         break;
//       default:
//         break;
//     }
//   }

//   clearCache() {
//     switch (this.type) {
//       case StorageType.LOCAL_STORAGE:
//         window.localStorage.clear();
//         break;
//       case StorageType.SESSION_STORAGE:
//         window.sessionStorage.clear();
//         break;
//       default:
//         break;
//     }
//   }
// }

// export default new LocalCache(StorageType.SESSION_STORAGE);
