/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import Icon from "@mui/material/Icon";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import meService from '../../services/meService';
import alertify from "alertifyjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Overview() {

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [givenJobs, setJobsGiven] = useState([]);
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [givenPriceOffers, setGivenPriceOffers] = useState([]);
  const [jobTabValue, setJobTabValue] = useState(0);
  const [receivedJobs, setReceivedJobs] = useState([]);
  const [receivedJobTab, setReceivedJobTab] = useState(0);
  const completeJob = async (jobId) => {
    try {
      await meService.completeJobAsync(jobId);

      // UI anında güncelle
      setReceivedJobs(prev =>
        prev.map(job =>
          job.id === jobId
            ? { ...job, status: 2 } // eğer backend int dönüyorsa
            : job
        )
      );

      alertify.success("İş tamamlandı");

    } catch (err) {
      alertify.error("İşlem başarısız");
    }
  };
  const deleteJob = async (id) => {
    console.log("DELETE ID:", id);
    try {
      await meService.deleteJobAsync(id);

      alertify.success("İş silindi");

      // listeyi güncelle
      setJobsGiven(givenJobs.filter(j => j.id !== id));

    } catch (error) {
      alertify.error("Silme hatası");
    }
  };

  const addLike = async (likedUserId) => {
    try {
      const likedById = profile.id; // giriş yapan user

      await meService.addLikeAsync({
        likedUserId: job.employerId
      });

      alertify.success("Beğenildi ❤️");

    } catch (err) {
      alertify.error("Beğeni başarısız");
    }
  };

  const fetchProfileAsync = async () => {
    setLoading(true);
    try {

      const response = await meService.getProfileAsync();
      setProfile(response);

      const commentsResponse = await meService.getCommentsAsync(response.id);
      setComments(commentsResponse);

      const totalLikesResponse = await meService.getTotalLikesAsync(response.id);
      setTotalLikes(totalLikesResponse);

      const jobsGivenResponse = await meService.getJobsGivenAsync(response.id);
      setJobsGiven(jobsGivenResponse);

      const priceOffersResponse =
        await meService.getGivenPriceOffersAsync();
      setGivenPriceOffers(priceOffersResponse);

      const receivedJobsResponse =
        await meService.getJobsReceivedAsync();
      setReceivedJobs(receivedJobsResponse);

    } catch (error) {

    }
    setLoading(false);
  }

  useEffect(() => {
    console.log("test");
    fetchProfileAsync();
    console.log("profile:", profile);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header profile={profile} totalLikes={totalLikes} tabValue={tabValue}
        setTabValue={setTabValue}>
        {tabValue === 0 && (
          <>
            {loading ? (
              <div className="p-6 text-center">
                <MDTypography>Yükleniyor...</MDTypography>
              </div>
            ) : (
              <MDBox mt={5} mb={3}>
                <Grid container spacing={1}>

                  <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                    <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />

                    <ProfileInfoCard
                      title="profile information"
                      description="Hi, I’m Alec Thompson..."
                      info={{
                        mobile: profile.phone,
                        email: profile.email,
                      }}
                      social={[
                        {
                          link: "https://www.facebook.com/CreativeTim/",
                          icon: <FacebookIcon />,
                          color: "facebook",
                        },
                      ]}
                      action={{ route: "", tooltip: "Edit Profile" }}
                      shadow={false}
                    />

                    <Divider orientation="vertical" sx={{ mx: 0 }} />
                  </Grid>

                  <Grid item xs={12} xl={4}>
                    <MDBox>

                      <MDTypography variant="h5" fontWeight="medium" mb={2}>
                        Comments
                      </MDTypography>

                      {comments.map((item, index) => (
                        <MDBox
                          key={index}
                          mb={2}
                          p={2}
                          borderRadius="lg"
                          bgColor="grey-100"
                        >
                          <MDTypography variant="h6">
                            {item.commentUserName} {item.commentUserSurname}
                          </MDTypography>

                          <MDTypography variant="button" color="text">
                            {item.content}
                          </MDTypography>

                        </MDBox>
                      ))}

                    </MDBox>
                  </Grid>

                </Grid>
              </MDBox>
            )}
          </>
        )}
        {tabValue === 0 && (
          <MDBox p={2}>
            <Grid container spacing={6}>

              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor1}
                  label="project #2"
                  title="modern"
                  description="As Uber works through a huge amount of internal management turmoil."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor2}
                  label="project #1"
                  title="scandinavian"
                  description="Music is something that everyone has their own specific opinion about."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor3}
                  label="project #3"
                  title="minimalist"
                  description="Different people have different taste, and various types of music."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team4, name: "Peterson" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team1, name: "Elena Morison" },
                  ]}
                />
              </Grid>

              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor4}
                  label="project #4"
                  title="gothic"
                  description="Why would anyone pick blue over pink? Pink is obviously a better color."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "view project",
                  }}
                  authors={[
                    { image: team4, name: "Peterson" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team1, name: "Elena Morison" },
                  ]}
                />
              </Grid>

            </Grid>
          </MDBox>
        )}

        {tabValue === 1 && (
          <MDBox p={2}>

            {/* ALT TABLAR */}
            <Tabs
              value={jobTabValue}
              onChange={(e, newValue) => setJobTabValue(newValue)}
              sx={{ mb: 3 }}
            >
              <Tab label="Verilen İşler" icon={<Icon>work</Icon>} />
              <Tab label="Tamamlanan İşler" icon={<Icon>check_circle</Icon>} />
            </Tabs>

            {/* VERİLEN İŞLER */}
            {jobTabValue === 0 && (
              <>
                <MDTypography variant="h5" mb={3}>
                  Verilen İşler
                </MDTypography>

                <MDBox mr={1} mb={2}>
                  <MDButton
                    variant="text"
                    color="success"
                    onClick={() => navigate("/job/create")}
                  >
                    <Icon>create</Icon>&nbsp;Ekle
                  </MDButton>
                </MDBox>

                {givenJobs.map((job) => (
                  <MDBox
                    key={job.id}
                    p={2}
                    mb={2}
                    borderRadius="lg"
                    bgColor="grey-100"
                  >
                    <MDTypography variant="h6">
                      {job.title}
                    </MDTypography>

                    <MDTypography variant="button" color="text">
                      {job.description}
                    </MDTypography>

                    <MDBox mr={1}>
                      <MDButton
                        variant="text"
                        color="info"
                        onClick={() =>
                          navigate("/job/update", { state: job })
                        }
                      >
                        <Icon>info</Icon>&nbsp;Detay
                      </MDButton>
                    </MDBox>

                    <MDButton
                      variant="text"
                      color="error"
                      onClick={() => deleteJob(job.id)}
                    >
                      <Icon>delete</Icon>&nbsp;Sil
                    </MDButton>

                    <MDButton
                      variant="text"
                      color="info"
                      onClick={() =>
                        navigate(`/profile/price-offers/${job.id}`, {
                          state: job,
                        })
                      }
                    >
                      <Icon>attach_money</Icon>&nbsp;Fiyat Teklifleri
                    </MDButton>

                  </MDBox>
                ))}
              </>
            )}

            {/* TAMAMLANAN İŞLER */}
            {jobTabValue === 1 && (
              <>
                <MDTypography variant="h5" mb={3}>
                  Tamamlanan İşler
                </MDTypography>

                {givenJobs
                  .filter(job => job.status === 2) // veya senin enum neyse
                  .map((job) => (
                    <MDBox
                      key={job.id}
                      p={2}
                      mb={2}
                      borderRadius="lg"
                      bgColor="grey-100"
                    >
                      <MDTypography variant="h6">
                        {job.title}
                      </MDTypography>

                      <MDTypography variant="button" color="text">
                        {job.description}
                      </MDTypography>
                    </MDBox>
                  ))}
              </>
            )}

          </MDBox>
        )}

        {tabValue === 2 && (
          <MDBox p={2}>
            {/* ALT TABLAR */}
            <Tabs
              value={receivedJobTab}
              onChange={(e, newValue) => setReceivedJobTab(newValue)}
              sx={{ mb: 3 }}
            >
              <Tab label="Aktif İşler" icon={<Icon>work</Icon>} />
              <Tab label="Tamamlanan İşler" icon={<Icon>check_circle</Icon>} />
            </Tabs>

            {receivedJobTab === 0 && (
              <>
                <MDTypography variant="h5" mb={3}>
                  Aktif Alınan İşler
                </MDTypography>

                {receivedJobs
                  .filter(job => job.status !== 2)
                  .map((job) => (
                    <MDBox key={job.id} p={2} mb={2} borderRadius="lg" bgColor="grey-100">

                      <MDTypography variant="h6">
                        {job.title}
                      </MDTypography>

                      <MDTypography variant="button" color="text">
                        {job.description}
                      </MDTypography>

                      <MDTypography variant="h6" color="text">
                        Status: {job.status}
                      </MDTypography>

                      <MDButton
                        variant="text"
                        color="success"
                        onClick={() => completeJob(job.id)}
                      >
                        <Icon>check</Icon>&nbsp;Tamamlandı
                      </MDButton>

                    </MDBox>
                  ))}
              </>
            )}
            {receivedJobTab === 1 && (
              <>
                <MDTypography variant="h5" mb={3}>
                  Tamamlanan İşler
                </MDTypography>

                {receivedJobs
                  .filter(job => job.status === 2)
                  .map((job) => (
                    <MDBox key={job.id} p={2} mb={2} borderRadius="lg" bgColor="grey-100">

                      <MDTypography variant="h6">
                        {job.title}
                      </MDTypography>

                      <MDTypography variant="button" color="text">
                        {job.description}
                      </MDTypography>

                      <MDTypography variant="h6" color="success">
                        ✔ Completed
                      </MDTypography>
                      <MDButton
                        variant="text"
                        color="error"
                        onClick={() => addLike(job.employerId)} // veya likedUserId neyse
                      >
                        <Icon>favorite</Icon>&nbsp;Beğeni
                      </MDButton>
                      <MDButton
                        variant="text"
                        color="success"

                      >
                        <Icon>comment</Icon>&nbsp;Yorum
                      </MDButton>
                    </MDBox>
                  ))}
              </>
            )}
          </MDBox>
        )}
        {tabValue === 3 && (
          <MDBox p={2}>

            <MDTypography variant="h5" mb={3}>
              Verilen Fiyat Teklifleri
            </MDTypography>

            {givenPriceOffers.map((offer) => (
              <MDBox
                key={offer.id}
                p={2}
                mb={2}
                borderRadius="lg"
                bgColor="grey-100"
              >

                <MDTypography variant="h6">
                  {offer.jobTitle}
                </MDTypography>

                <MDTypography variant="button" color="text" display="block">
                  Teklif Tutarı: {offer.offeredPrice} ₺
                </MDTypography>

                <MDTypography variant="button" color="text" display="block">
                  Durum: {offer.status}
                </MDTypography>

              </MDBox>
            ))}

          </MDBox>
        )}
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
