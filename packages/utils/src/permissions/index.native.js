import { Platform, Alert } from 'react-native'
import {
  PERMISSIONS,
  RESULTS,
  check,
  checkNotifications,
  request,
  requestNotifications,
  openSettings,
} from 'react-native-permissions'

const OS = Platform.OS.toUpperCase()

export const withPermission = (
  KEY,
  reason,
  onSuccessCallback,
  onErrorCallback,
  notificationsOptions,
) => {
  const IS_NOTIFICATIONS = KEY === 'NOTIFICATIONS'
  let PERMISSION
  let checkFunc, checkData
  let requestFunc, requestData
  if (IS_NOTIFICATIONS) {
    checkFunc = checkNotifications
    checkData = null
    requestFunc = requestNotifications
    requestData = notificationsOptions
  } else {
    PERMISSION = PERMISSIONS[OS][KEY]
    if (!PERMISSION) {
      onError(KEY, 'Permission not found', onErrorCallback)
      return
    }
    checkFunc = check
    checkData = PERMISSION
    requestFunc = request
    requestData = PERMISSION
  }

  const permissionName = KEY.split('_').map(w =>
    w[0].toUpperCase() + w.slice(1, w.length).toLowerCase()
  ).join(' ')

  checkFunc(checkData)
    .then(checkResult => {
      let checkStatus
      let checkOptions
      if (IS_NOTIFICATIONS) {
        checkStatus = checkResult.status
        checkOptions = checkResult.settings
      } else {
        checkStatus = checkResult
        checkOptions = null
      }

      switch (checkStatus) {
      case RESULTS.UNAVAILABLE:
        onNotAvailable(permissionName, onErrorCallback)
        break

      case RESULTS.BLOCKED:
        onBlocked(permissionName, reason, onErrorCallback)
        break

      case RESULTS.GRANTED:
        onSuccessCallback(checkOptions)
        break

      case RESULTS.DENIED:
        requestFunc(requestData)
          .then(requestResult => {
            let reqStatus
            let reqOptions
            if (IS_NOTIFICATIONS) {
              reqStatus = requestResult.status
              reqOptions = requestResult.settings
            } else {
              reqStatus = requestResult
              reqOptions = null
            }

            switch (reqStatus) {
            case RESULTS.GRANTED:
              onSuccessCallback(reqOptions)
              break

            case RESULTS.BLOCKED:
            case RESULTS.DENIED:
              onErrorCallback && onErrorCallback()
              break

            default:
              onError(KEY, 'Unknown result', onErrorCallback)
            }
          })
          .catch((error) => onError(KEY, error, onErrorCallback))
        break

      default:
        onError(KEY, 'Unknown result', onErrorCallback)
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

const onNotAvailable = (permissionName, onErrorCallback) => {
  Alert.alert(
    `Permission ${permissionName} unavailable`,
    'This feature is not available (on this device / in this context)',
  )
  onErrorCallback && onErrorCallback()
}

const onBlocked = (permissionName, reason, onErrorCallback) => {
  Alert.alert(
    `Permission for "${permissionName}" is blocked`,
    `This app needs access to "${permissionName}" in order to ${reason}`,
    [
      {
        text: 'Do not allow',
        style: 'cancel',
        onPress: () => {
          onErrorCallback && onErrorCallback()
        }
      },
      {
        text: 'Take me to settings',
        onPress: () => {
          openSettings()
        },
      }
    ],
    { cancelable: true },
  )
}
