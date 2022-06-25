import ArrowAltCircle from "../components/arrowNavigation/ArrowAltCircle";
import Navigation from "../components/nav/Navigation";
import OverviewOfSelectedProvider from "../components/overviewOfSelectedProvider/OverviewOfSelectedProvider";

export default function OverviewOfSelectedProviderPage(){

    return(
        <>
            <Navigation />
            <ArrowAltCircle backUrl="/dodatna-usluga/animator"/>
            <OverviewOfSelectedProvider />
        </>
    )
}