import React from 'react';
import { Horizontal } from 'app-studio';
import {
  UserIcon,
  HomeIcon,
  SettingsIcon,
  SearchIcon,
  HeartIcon,
  StarIcon,
  CameraIcon,
  CalendarIcon,
  DownloadIcon,
  TrashIcon,
} from '../Icon';

export const NamedIcons = () => (
  <Horizontal gap={14} flexWrap="wrap" alignItems="center">
    <UserIcon widthHeight={24} color="color-gray-700" />
    <HomeIcon widthHeight={24} color="color-gray-700" />
    <SettingsIcon widthHeight={24} color="color-gray-700" />
    <SearchIcon widthHeight={24} color="color-gray-700" />
    <HeartIcon widthHeight={24} color="color-red-500" />
    <StarIcon widthHeight={24} color="color-amber-500" />
    <CameraIcon widthHeight={24} color="color-gray-700" />
    <CalendarIcon widthHeight={24} color="color-gray-700" />
    <DownloadIcon widthHeight={24} color="color-gray-700" />
    <TrashIcon widthHeight={24} color="color-gray-700" />
  </Horizontal>
);
