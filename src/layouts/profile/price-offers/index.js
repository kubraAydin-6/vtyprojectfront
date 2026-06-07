import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import meService from "services/meService";

function PriceOffers() {

    const location = useLocation();
    const job = location.state;

    const [priceOffers, setPriceOffers] = useState([]);
    const approvePriceOffer = async (offerId, jobId) => {

        try {
            await meService.putApprovePriceOfferAsync(offerId, jobId);
            console.log("APPROVED OFFER:", offerId);
            console.log("JOB ID:", jobId);
            // UI refresh
            fetchPriceOffers();

        } catch (error) {
            console.log(error);
        }
    };
    const fetchPriceOffers = async () => {
        try {

            const response = await meService.getPriceOffersAsync(job.id);
            console.log(response);
            setPriceOffers(response);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPriceOffers();
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />

            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>

                        <Card>

                            <MDBox pt={3} px={2}>
                                <MDTypography variant="h5" fontWeight="medium">
                                    Fiyat Teklifleri
                                </MDTypography>

                                <MDTypography variant="button" color="text">
                                    {job.title}
                                </MDTypography>
                            </MDBox>

                            <MDBox pt={1} pb={2} px={2}>
                                <MDBox
                                    component="ul"
                                    display="flex"
                                    flexDirection="column"
                                    p={0}
                                    m={0}
                                >

                                    {priceOffers.map((offer) => {
                                        console.log(offer);

                                        return (
                                            <MDBox
                                                key={offer.id}
                                                display="flex"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                bgColor="grey-100"
                                                borderRadius="lg"
                                                p={3}
                                                mb={2}
                                            >
                                                <MDBox>

                                                    <MDTypography variant="h6">
                                                        {offer.workerName} {offer.workerSurname}
                                                    </MDTypography>

                                                    <MDTypography variant="h6" color="text">
                                                        Teklif: ₺{offer.offeredPrice}
                                                    </MDTypography>

                                                    <MDTypography variant="h6" color="text">
                                                        Status: {offer.priceOfferStatus}
                                                    </MDTypography>

                                                    <MDTypography variant="h6" color="text">
                                                        Teklif Verme Tarihi: {offer.createdDate}
                                                    </MDTypography>

                                                    <MDTypography variant="h6" color="text">
                                                        OfferId: {offer.id}
                                                    </MDTypography>

                                                    <br />

                                                </MDBox>

                                                <MDBox display="flex">
                                                    {offer.priceOfferStatus == 0 && (
                                                        <>
                                                            <MDButton
                                                                variant="text"
                                                                color="success"
                                                                onClick={() => approvePriceOffer(offer.id, job.id)}
                                                            >
                                                                <Icon>check</Icon>&nbsp;Kabul Et
                                                            </MDButton>

                                                            <MDButton
                                                                variant="text"
                                                                color="error"
                                                            >
                                                                <Icon>close</Icon>&nbsp;Reddet
                                                            </MDButton>
                                                        </>
                                                    )}
                                                    {offer.priceOfferStatus == 1 && (
                                                        <>
                                                        <Icon color="success">check</Icon>
                                                        </>
                                                    )}

                                                    {offer.priceOfferStatus == 2 && (
                                                        <>
                                                        <Icon color="error">close</Icon>
                                                        </>
                                                    )}
                                                </MDBox>
                                            </MDBox>


                                        );
                                    })}

                                </MDBox>
                            </MDBox>

                        </Card>

                    </Grid>
                </Grid>
            </MDBox>

        </DashboardLayout >
    );
}

export default PriceOffers;