/**
 * NAVIRA Demonstration & Showcase Configuration
 * To add your official demonstration video, simply paste the direct MP4,
 * YouTube embed URL, or Vimeo embed URL into `videoUrl` below.
 */

export interface ShowcaseConfig {
  title: string;
  subtitle: string;
  videoUrl: string | null; // e.g. "https://www.youtube.com/embed/YOUR_VIDEO_ID" or direct MP4 URL
  previewImageUrl: string;
}

export const NAVIRA_SHOWCASE_CONFIG: ShowcaseConfig = {
  title: 'NAVIRA Platform & Project Showcase',
  subtitle: 'Official Demonstration Coming Soon',
  videoUrl: null, // Set to your video URL when ready
  previewImageUrl: '/assets/team-collaboration.jpg',
};

