import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const ENGDIS_BASE_API_URL = "https://eduiwebservices20.engdis.com/api/";

app.get("/", (req, res, next) => {
  res.json({ hello: "world" });
});

app.post("/apis/Auth/Login", (req, res, next) => {
  axios
    .post(ENGDIS_BASE_API_URL + "Auth/forcelogin", {
      CommunityVersion: "100",
      InstitutionId: "5232957", // KMITL
      Password: req.body.password,
      UserName: req.body.username,
    })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => console.log(error));
});

app.post("/apis/Auth/Logout", (req, res, next) => {
  const config = {
    headers: { Authorization: `Bearer ${req.body.token}` },
  };
  axios
    .get(`${ENGDIS_BASE_API_URL}Auth/Logout`, config)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => console.log(error));
});

app.post("/apis/CourseTree/GetDefaultCourseProgress", (req, res, next) => {
  const config = {
    headers: { Authorization: `Bearer ${req.body.token}` },
  };
  axios
    .get(`${ENGDIS_BASE_API_URL}CourseTree/GetDefaultCourseProgress`, config)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => console.log(error));
});

app.post("/apis/CourseTree/getCourseTree", (req, res, next) => {
  const config = {
    headers: { Authorization: `Bearer ${req.body.token}` },
  };

  const data = [
    {
      ParticleId: req.body.nodeId,
      NodeType: 2,
      LockedNodes: null,
      particleHasProgress: true,
      lowestNodeType: 5,
    },
  ];

  axios
    .post(
      `${ENGDIS_BASE_API_URL}CourseTree/GetUserNodeProgress/${req.body.parentNodeId}`,
      data,
      config
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => console.log(error));
});

app.post("/apis/Progress/SetProgressPerTask", (req, res, next) => {
  const config = {
    headers: { Authorization: `Bearer ${req.body.token}` },
  };

  const data = {
    CourseId: req.body.CourseId,
    ItemId: req.body.ItemId,
  };

  axios
    .post(`${ENGDIS_BASE_API_URL}Progress/SetProgressPerTask`, data, config)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => console.log(error));
});

app.post("/apis/UserTestV1/SaveUserTest", (req, res, next) => {
  const config = {
    headers: { Authorization: `Bearer ${req.body.token}` },
  };

  axios
    .post(
      `${ENGDIS_BASE_API_URL}UserTestV1/SaveUserTest/${req.body.parentNodeId}/${req.body.nodeId}/true`,
      req.body.payload,
      config
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => console.log(error));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server are now started on port: ${PORT}`);
});
