import ArrowAltCircle from "../components/global/ArrowAltCircle";
import Navigation from "../components/global/Navigation";
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