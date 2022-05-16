import React from "react";
import ReactPlayer from "react-player";
import { getRootPath } from "../../../../utils/helpers";
import {
  handleResize
} from "../../../ComponentRenderer/common/js/deviceDetection";
import { Controller, Scene } from 'react-scrollmagic';
import styled from 'styled-components';

import "./CameraSoftwareGalleryCard.global.css";

export const CameraSoftwareGalleryCard = props => {
  const { title, description, gallery } = props.data;
  const deviceType = handleResize();

  return (
    <>
      {
        deviceType.isMobile && (
          <>
            <SectionWipesStyled>
              <div
                className="camera-software-gallery"
                id="camera-software-gallery"
              >
                <div className="camera-software-gallery__header bg-blue">
                  <h2
                    className="camera-software-gallery__header__title"
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                  <p
                    className="camera-software-gallery__header__description"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              </div>
              <Controller globalSceneOptions={{ triggerHook: 'onLeave' }}>
                {
                  gallery.length &&
                    gallery.map((item, index) => {
                      return (
                        <Scene offset={ index } pin={{ pushFollowers: true }}>
                          <div className="panel bg-blue">
                            <div className="camera-software-gallery__gallery__item__infos w-100">
                              <h3
                                className="camera-software-gallery__gallery__item__infos__title subtitle_tahoe w-100 f3 ma0 mb4 white fw4 pl5 pr5"
                                dangerouslySetInnerHTML={{ __html: item.title }}
                              />
                              <p
                                className="camera-software-gallery__gallery__item__infos__description description_tahoe f6 ma0 w-100 pl5 pr5 pb5"
                                dangerouslySetInnerHTML={{ __html: item.description }}
                              />
                            </div>
                            {
                              item.video ?
                              <div className="camera-software-gallery__gallery__item__video">
                                <ReactPlayer
                                  id="dc-vimeo-videoid"
                                  className="csg__react-player camera-software-gallery__gallery__item__video__player"
                                  url={`https://player.vimeo.com/video/${item.video}`}
                                  muted
                                  loop
                                  autoplay
                                  playing
                                  playsinline
                                  width={'100%'}
                                  height={'100%'}
                                />
                              </div>
                              :
                              <img
                                className="camera-software-gallery__gallery__item__image"
                                alt={item.alt}
                                src={
                                  item.imageURL ||
                                  item.imageFile ||
                                  (item.mobile_image
                                    ? `${getRootPath}/arquivos/${item.mobile_image}`
                                    : '')
                                }
                              />
                            }
                          </div>
                        </Scene>
                      )
                    })
                }
              </Controller>
            </SectionWipesStyled>
          </>
        )
      }
    </>
  );
};

const SectionWipesStyled = styled.div`
  overflow: hidden;
  .panel {
    height: 100vh;
    width: 100vw;
  }
  
  .panel > div {
    position: relative;
    display: block;
  }

  .camera-software-gallery__header.bg-blue {
    position: relative;
    background-color: #001428 !important;
  }
  
  .panel.bg-blue {
    background-color: #001428;
    position: relative;
    padding-top: 20px;
  }
  
  .camera-software-gallery__gallery__item__infos, .camera-software-gallery__gallery__item__video,
  .camera-software-gallery__gallery__item__image {
    background-color: #001428;
    position: relative;
  }
`;

export default CameraSoftwareGalleryCard;
