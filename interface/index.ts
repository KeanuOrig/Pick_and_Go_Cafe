export interface LandingData {
    id: number;
    angle: number;
    title: string;
    content: string[];
    position: {
        left: string | undefined;
        right: string | undefined;
        top: string;
    }
}
