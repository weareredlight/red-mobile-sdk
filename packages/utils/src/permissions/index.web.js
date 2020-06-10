import '@babel/polyfill'

const PERMISSIONS = {
  CAMERA: {
    check: async () => {
      const permissionStatus =
        await navigator.permissions.query({ name: 'camera' })
      if (permissionStatus.state === 'granted') {
        return true
      }
      return false
    },
    request: async permissionOptions => {
      const promise = new Promise((resolve, reject) => {
        navigator.mediaDevices.getUserMedia(
          permissionOptions || { audio: false, video: true }
        )
          .then((stream) => {
            // access approved
            const track = stream.getTracks()[0]
            // stop stream immediately
            track.stop()
            resolve(true)
          })
          .catch(() => {
            // access denied
            resolve(false)
          })
      });
      return promise
    },
  },
  LOCATION: {
    check: async () => {
      const permissionStatus =
        await navigator.permissions.query({ name: 'geolocation' })
      if (permissionStatus.state === 'granted') {
        return true
      }
      return false
    },
    request: async () => {
      const promise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          () => {
            resolve(true)
          },
          () => {
            resolve(false)
          },
        )
      });
      return promise
    },
  },
  STORAGE: {
    check: async () => {
      return true
    },
    request: async () => {
      return true
    },
  },
}

export const withPermission = async (
  KEY,
  reason,
  onSuccessCallback,
  onErrorCallback,
  permissionOptions,
) => {
  const permissionObj = PERMISSIONS[KEY]

  if (!permissionObj) {
    onError(KEY, 'Permission not found', onErrorCallback)
    return
  }

  permissionObj.check()
    .then(check => {
      if (check) {
        onSuccessCallback()
      } else {
        permissionObj.request(permissionOptions)
          .then(permission => {
            if (permission) {
              onSuccessCallback()
            } else {
              onErrorCallback && onErrorCallback()
            }
          })
          .catch((error) => onError(KEY, error, onErrorCallback))
      }
    })
    .catch((error) => {
      onError(KEY, error, onErrorCallback)
    })
}

const onError = (KEY, error, onErrorCallback) => {
  console.warn('Permission request for', KEY, 'has failed.', error)
  onErrorCallback && onErrorCallback()
}
