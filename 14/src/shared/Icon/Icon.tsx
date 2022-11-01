import React from 'react'
import styles from './icon.scss'
import classNames from 'classnames'
import { CommentIcon, HideIcon, SaveIcon, ShareIcon, WarningIcon, IconAnon, KarmaCountArrowIcon, CloseIcon, MenuIcon, ShareIconDark, SaveIconDark, PasteTagIcon, PasteImgIcon, PasteFailIcon, PasteDownloadIcon, PastePhotoIcon, PasteSyncingIcon, PasteCopyLinkIcon, PasteAudioRecordingIcon, PasteCommentIcon, PasteBackgroundIcon, PasteSizeIcon, PastePdfIcon, AddCommentIcon, SortArrowIcon } from '../Icons'

type TIconSize = 14 | 16 | 18 | 50 | 30

interface IIconProps {
  size: TIconSize
  mobileSize?: TIconSize
  name?: EIcons
  className?: string
}

export enum EIcons {
  CommentIcon = 'CommentIcon',
  HideIcon = 'HideIcon',
  SaveIcon = 'SaveIcon',
  SaveIconDark = 'SaveIconDark',
  ShareIcon = 'ShareIcon',
  ShareIconDark = 'ShareIconDark',
  WarningIcon = 'WarningIcon',
  IconAnon = 'IconAnon',
  MenuIcon = 'MenuIcon',
  KarmaCountArrowIcon = 'KarmaCountArrowIcon',
  CloseIcon = 'CloseIcon',
  AddCommentIcon = 'AddCommentIcon',
  SortArrowIcon = 'SortArrowIcon',

  // ====================
  PasteTagIcon = 'PasteTagIcon',
  PasteImgIcon = 'PasteImgIcon',
  PasteFailIcon = 'PasteFailIcon',
  PasteDownloadIcon = 'PasteDownloadIcon',
  PastePhotoIcon = 'PastePhotoIcon',
  PasteSyncingIcon = 'PasteSyncingIcon',
  PasteCopyLinkIcon = 'PasteCopyLinkIcon',
  PasteAudioRecordingIcon = 'PasteAudioRecordingIcon',
  PasteCommentIcon = 'PasteCommentIcon',
  PasteBackgroundIcon = 'PasteBackgroundIcon',
  PasteSizeIcon = 'PasteSizeIcon',
  PastePdfIcon = 'PastePdfIcon',
}

export function Icon(props: IIconProps) {
  const {
    size,
    name,
    mobileSize,
    className,
  } = props

  const classes = classNames(
    styles[`s${size}`],
    className,
    { [styles[`m${mobileSize}`]]: mobileSize },
  )

  switch (name) {

    case EIcons.CommentIcon:
      return <CommentIcon className={classes} />

    case EIcons.HideIcon:
      return <HideIcon className={classes} />

    case EIcons.SaveIcon:
      return <SaveIcon className={classes} />

    case EIcons.SaveIconDark:
      return <SaveIconDark className={classes} />

    case EIcons.ShareIcon:
      return <ShareIcon className={classes} />

    case EIcons.ShareIconDark:
      return <ShareIconDark className={classes} />

    case EIcons.WarningIcon:
      return <WarningIcon className={classes} />

    case EIcons.IconAnon:
      return <IconAnon className={classes} />

    case EIcons.MenuIcon:
      return <MenuIcon className={classes} />

    case EIcons.KarmaCountArrowIcon:
      return <KarmaCountArrowIcon className={classes} />

    case EIcons.CloseIcon:
      return <CloseIcon className={classes} />

    case EIcons.AddCommentIcon:
      return <AddCommentIcon className={classes} />

    case EIcons.SortArrowIcon:
      return <SortArrowIcon className={classes} />

    // =================================================================
    case EIcons.PasteTagIcon:
      return <PasteTagIcon className={classes} />

    case EIcons.PasteImgIcon:
      return <PasteImgIcon className={classes} />

    case EIcons.PasteFailIcon:
      return <PasteFailIcon className={classes} />

    case EIcons.PasteDownloadIcon:
      return <PasteDownloadIcon className={classes} />

    case EIcons.PastePhotoIcon:
      return <PastePhotoIcon className={classes} />

    case EIcons.PasteSyncingIcon:
      return <PasteSyncingIcon className={classes} />

    case EIcons.PasteCopyLinkIcon:
      return <PasteCopyLinkIcon className={classes} />

    case EIcons.PasteAudioRecordingIcon:
      return <PasteAudioRecordingIcon className={classes} />

    case EIcons.PasteCommentIcon:
      return <PasteCommentIcon className={classes} />

    case EIcons.PasteBackgroundIcon:
      return <PasteBackgroundIcon className={classes} />

    case EIcons.PasteSizeIcon:
      return <PasteSizeIcon className={classes} />

    case EIcons.PastePdfIcon:
      return <PastePdfIcon className={classes} />

    default:
      break
  }

  return <></>
}
