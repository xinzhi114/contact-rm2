import React from 'react'
import { Button, Carousel } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './styles.scss'

export type ILoginCarouselItem = {
  imgSrc?: string
  caption: JSX.Element
  orange?: boolean
  justifyImgStart?: boolean
  className?: string
}

export interface ILoginCarouselProps {
  activeIndex: number
  onSelect?: (newIndex: number, e: Record<string, any> | null) => void
  onLoginClick?: () => void
  customItems?: ILoginCarouselItem[]
}

export const LoginCarousel: React.FunctionComponent<ILoginCarouselProps> = (props) => {
  const { t: _t } = useTranslation()
  const t = (key: string) => _t(`login.${key}`)

  const { activeIndex, onSelect, onLoginClick, customItems } = props

  const items: ILoginCarouselItem[] = customItems
    ? customItems
    : [
        {
          imgSrc: '/assets/login-carousel-1.png',
          caption: (
            <>
              <span className="caption-title">
                {t('manage_your')} <span className="bold">{t('accounts')}</span>
              </span>
              <span className="caption-subtitle">{t('carousel_subtitle')}</span>
              <div className="tablet-show desktop-hide">
                <Button variant="primary" onClick={() => onLoginClick && onLoginClick()}>
                  {t('login_to_existing_account')}
                </Button>
              </div>
            </>
          ),
          orange: true,
        },
        {
          imgSrc: '/assets/login-carousel-2.png',
          justifyImgStart: true,
          caption: (
            <>
              <span className="caption-title">
                <span className="bold">{t('pay')}</span> {t('bills_and')}{' '}
                <span className="bold">{t('transfer')}</span> {t('money')}
              </span>
              <span className="caption-subtitle">{t('carousel_subtitle')}</span>
              <div className="tablet-show desktop-hide">
                <Button variant="primary" onClick={() => onLoginClick && onLoginClick()}>
                  {t('login_to_existing_account')}
                </Button>
              </div>
            </>
          ),
        },
        {
          imgSrc: '/assets/login-carousel-3.png',
          caption: (
            <>
              <div className="mobile-preview">
                <img src="/assets/mobile-bank-preview.png" alt="mobile bank" />
                <span className="caption-subtitle">
                  <span className="bold">{t('download')}</span> {t('and_explore_new_banking')}{' '}
                  <span className="bold">{t('experience')}</span>
                </span>
                <div className="app-download-buttons">
                  <img src="/assets/download-app-store.svg" alt="app store" className="app-store" />
                  <img src="/assets/download-google-play.png" alt="google play" />
                </div>
              </div>
            </>
          ),
          className: 'mobile-preview-wrapper',
        },
      ]

  return (
    <div className="login-carousel">
      <Carousel activeIndex={activeIndex} onSelect={onSelect}>
        {items.map((item, index) => (
          <Carousel.Item key={index} className={item.className || ''}>
            {item.imgSrc && (
              <div className={`img-wrapper ${item.justifyImgStart ? 'justify-start' : ''}`}>
                <img src={item.imgSrc} alt="slide" />
              </div>
            )}
            <div className={`bottom-background ${item.orange ? 'orange' : ''}`}>
              <div className="top-decoration-wrapper">
                <div className="top-decoration-reference">
                  <div className="top-decoration" />
                  <div className="top-decoration-fade-1" />
                  <div className="top-decoration-fade-2" />
                </div>
              </div>
              <div className="bottom-fill" />
            </div>
            <Carousel.Caption>
              <div className={`caption-content ${item.orange ? 'orange' : ''}`}>{item.caption}</div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}
