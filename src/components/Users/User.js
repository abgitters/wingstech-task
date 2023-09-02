import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Avatar from "@mui/material/Avatar";

const User = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [avatar, setAvatar] = useState("");

  const handlePaginationChange = (event, value) => {
    setPage(value * 10);
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "login",
      label: "Login",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "avatar_url",
      label: "Avatar",
      options: {
        filter: true,
        sort: false,
        // customBodyRenderLite: (index) => {
        //   let image = data.find((u) => u.id == index)?.avatar_url;
        //   return <Avatar alt="" src={image} />;
        // },
        customBodyRender: (value) => {
          return <Avatar alt="" src={value} />;
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    onRowClick: (index) => {
      let avatarIndex = index[0];
      let image = data.find((u) => u.id == avatarIndex)?.avatar_url;
      setAvatar(image);
      return handleClickOpen();
    },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`https://api.github.com/users?per_page=10&since=${page}`)
      .then((res) => {
        setData(res?.data);
        // console.log(res?.data);
      })
      .catch((err) => console.error(err));
  }, [page]);

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogContent>
          <img src={avatar} />
        </DialogContent>
      </Dialog>
      <Container sx={{ my: 4 }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <MUIDataTable
              title={"Customer List"}
              data={data}
              columns={columns}
              options={options}
            />
          </Grid>
          <Grid item xs={6}>
            <Pagination
              count={20}
              color="primary"
              size="large"
              onChange={handlePaginationChange}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default User;
