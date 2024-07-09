import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles'; 
import { useState } from 'react';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import axios from "axios";
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from '../Carousel/Carousel';
import { useEffect } from 'react';
import './ContentModal.css'


const Paper = styled('div')({
  width: "90%",
  height: "80%",
  backgroundColor: "#39445a",
  border: "1px solid #282c34",
  borderRadius: 10,
  color: "white",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
  padding: "8px 16px 24px",
  overflowY: "scroll",
  margin: "auto",
  marginTop: "20px",
});

const ModalContainer = styled('div')({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function TransitionsModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const apiKey = import.meta.env.VITE_REACT_API_KEY;


  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}&language=en-US`
    );

    setContent(data);
    console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${apiKey}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className="flex flex-col w-[200px] p-1 my-2 bg-slate-500 rounded-xl relative hover:bg-white text-black cursor-pointer"
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={ModalContainer}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          {content && (
            <Paper>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="primary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </Paper>
          )}
        </Fade>
      </Modal>
    </>
  );
}