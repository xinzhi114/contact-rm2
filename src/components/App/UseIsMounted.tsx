import { useEffect, useRef } from 'react'

/**
 * check component is mounted
 */
export function useIsMounted(): { current: boolean } {
  const componentIsMounted = useRef(true)
  useEffect(
    () => () => {
      componentIsMounted.current = false
    },
    []
  )
  return componentIsMounted
}
