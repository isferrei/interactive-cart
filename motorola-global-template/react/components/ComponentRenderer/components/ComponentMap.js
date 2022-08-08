import { lazy } from "react";
const SpacerCard = lazy(() => import("./SpacerCard/index"));
const ImageVideoGallery = lazy(() => import("./ImageVideoGallery/index"));
const DividerCard = lazy(() => import("./DividerCard/index"));
const FullBleedImage = lazy(() => import("./FullBleedImage/index"));
const MotoExperience = lazy(() => import("./MotoExperience/index"));
const ReviewsCard = lazy(() => import("./ReviewsCard/index"));
const ProductSpecsSummary = lazy(() => import("./ProductSpecsSummary/index"));
const FullBleedVideoCard = lazy(() => import("./FullBleedVideoCard/index"));
const OmniChannel = lazy(() => import("./OmniChannel/index"));
const OpenHtml = lazy(() => import("./OpenHtml/index"));
const MultiEditorialCard = lazy(() => import("./MultiEditorialCard/index"));
const CameraSliderCard = lazy(() => import("./CameraSliderCard/index"));
const BuilderCard = lazy(() => import("./BuilderCard/index"));
const FamilyHeroCard = lazy(() => import("./FamilyHeroCard/index"));
const SizzleVideoCard = lazy(() => import("./SizzleVideoCard/index"));
const ModernizedImageGalleryCard = lazy(() =>
  import("./ModernizedImageGalleryCard/index")
);
const PdpBatteryFadeInJackCard = lazy(() =>
  import("./PdpBatteryFadeInJackCard/index")
);
const PdpBatterySectionSwipeCard = lazy(() =>
  import("./PdpBatterySectionSwipeCard/index")
);
const CameraGalleryCard = lazy(() => import("./CameraGalleryCard/index"));
const CameraSoftwareGalleryCard = lazy(() =>
  import("./CameraSoftwareGalleryCard/index")
);
const CameraOverviewCard = lazy(() => import("./CameraOverview/index"));
const PdpAutoplayVideoCard = lazy(() => import("./PdpAutoplayVideoCard/index"));
const FAQ = lazy(() => import("./FAQ/index"));
const DisplayCard = lazy(() => import("./DisplayCard/index"));
const PeriscopicLens = lazy(() => import("./PeriscopicLens/index"));
const EdgeGallery = lazy(() => import("./EdgeGallery/index"));
const ImmersiveScrollActivatedVideo = lazy(() =>
  import("../../ImmersiveScrollActivatedVideo/index")
);
const PdpHeroBanner = lazy(() => import("./PdpHeroBanner/index"));
const ScrollVideoPerformance = lazy(() =>
  import("../../ScrollVideoPerformance/index")
);
const RogueHeader = lazy(() => import("../../RogueHeader/index"));
const GalleryWallCard = lazy(() => import("./GalleryWallCard/index"));
const CameraLens = lazy(() => import("../../CameraLens/index"));
const ScrollBasedPhotoGallery = lazy(() =>
  import("../../ScrollBasedPhotoGallery/index")
);

const CameraOverview = lazy(() => import("../../CameraOverview"));
const Masonry = lazy(() => import("../../Masonry"));
const WaterProtection = lazy(() => import("../../WaterProtection"));
const Accordion = lazy(() => import("../../Accordion"));
const CameraSoftwareGallery = lazy(() => import("../../CameraSoftwareGallery"));

const ComparisonTable = lazy(() => import("../../ComparisonTable"));

const stringToCardMapper = {
  spacer_card: SpacerCard,
  image_video_gallery: ImageVideoGallery,
  divider_card: DividerCard,
  full_bleed_image: FullBleedImage,
  reviews_card: ReviewsCard,
  product_specs_summary: ProductSpecsSummary,
  full_bleed_video: FullBleedVideoCard,
  camera_overview_card: CameraOverviewCard,
  omni_channel: OmniChannel,
  newmotoexp: MotoExperience,
  open_html: OpenHtml,
  multi_column_editorial: MultiEditorialCard,
  camera_slider: CameraSliderCard,
  panels: BuilderCard,
  family_hero: FamilyHeroCard,
  sizzle_video: SizzleVideoCard,
  modernized_image_gallery: ModernizedImageGalleryCard,
  battery_fadein_jack: PdpBatteryFadeInJackCard,
  battery_section_swipe: PdpBatterySectionSwipeCard,
  interactive_image_gallery: CameraGalleryCard,
  camera_software_gallery_card: CameraSoftwareGalleryCard,
  pdp_autoplay_video_card: PdpAutoplayVideoCard,
  faq_section_outer_layer: FAQ,
  display_card: DisplayCard,
  periscopic_lens: PeriscopicLens,
  edge_gallery: EdgeGallery,
  pdp_hero_banner: PdpHeroBanner,
  immersive_scroll_activated_video: ImmersiveScrollActivatedVideo,
  scroll_video_performance: ScrollVideoPerformance,
  rogue_header: RogueHeader,
  gallery_wall_card: GalleryWallCard,
  camera_lens: CameraLens,
  scroll_based_photo_gallery: ScrollBasedPhotoGallery,
  camera_overview: CameraOverview,
  masonry: Masonry,
  water_protection: WaterProtection,
  accordion: Accordion,
  camera_software_gallery: CameraSoftwareGallery,

  comparison_table: ComparisonTable
};

export { stringToCardMapper };
