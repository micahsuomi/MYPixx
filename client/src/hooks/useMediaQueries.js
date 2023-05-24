import { useMediaQuery } from 'react-responsive'


export const useMediaQueries = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
      })
      const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
      const isTablet = useMediaQuery({ query: '(max-width: 768px)' })
      const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
      const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
      const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    return {
        isDesktopOrLaptop, isTablet, isMobile
    }
}