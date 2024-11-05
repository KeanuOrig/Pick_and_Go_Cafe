import { useIndicator } from '@/context/IndicatorContext';

export const useGoToScene = () => {
  const { setShowLandingIndicator, setShowDetailIndicator } = useIndicator();

  const goToScene = (scene: string) => {
    const setIndicatorTimer = (duration: number | undefined) => {
      const timer = setTimeout(() => {
        setShowDetailIndicator(null);
      }, duration);
      return () => clearTimeout(timer);
    };

    document.getElementById(scene)?.scrollIntoView({ behavior: 'smooth' });

    switch (scene) {
      case 'landingScene':
        setShowLandingIndicator(true);
        setShowDetailIndicator(null);
        break;

      case 'detailScene':
        setShowDetailIndicator('detail');
        setShowLandingIndicator(false);
        return setIndicatorTimer(4000);

      case 'globeScene':
        setShowDetailIndicator('globe');
        setShowLandingIndicator(false);
        return setIndicatorTimer(4000);

      default:
        setShowLandingIndicator(false);
        setShowDetailIndicator(null);
        break;
    }
  };

  return goToScene;
};
