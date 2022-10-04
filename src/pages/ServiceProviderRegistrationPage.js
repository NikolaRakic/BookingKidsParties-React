import Navigation from "../components/global/Navigation";
import ServiceProviderRegistration from "../components/serviceProviderRegistration/ServiceProviderRegistration";

export default function ServiceProviderRegistracionPage() {
  return <div>
            <Navigation active={"/pruzaoci-usluga/registracija"} />
            <ServiceProviderRegistration />
        </div>;
}