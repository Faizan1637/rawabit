// import Carousel from "@/components/coursel"
// import CTASection from "@/components/cta-section"
// import VideoSection from "@/components/video-section"
// import MembershipPlans from "@/components/membership-plans"
// import FeaturedProfiles from "@/components/feature-member"
// import InfoBanner from "@/components/info-bannner"
// import Footer from "@/components/footer"

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-background">
      
//       <main className="pt-20">
//         <div className="container mx-auto px-4 py-8">
//           <Carousel />
//         </div>
//         <CTASection/>
//         <VideoSection/>
//         <MembershipPlans/>
//         <FeaturedProfiles/>
//         <InfoBanner/>
//         <Footer/>
//       </main>
//     </div>
//   )
// }
import StepperForm from "@/components/stepper-form"

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <StepperForm />
    </main>
  )
}

