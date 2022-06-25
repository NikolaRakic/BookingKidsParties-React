import Navigation from "../components/nav/Navigation";
import ServiceProviderRegistration from "../components/serviceProviderRegistration/ServiceProviderRegistration";

export default function ServiceProviderRegistracionPage() {
  return <div>
            <Navigation active={"/pruzaoci-usluga/registracija"} />
            <ServiceProviderRegistration />
        </div>;
}