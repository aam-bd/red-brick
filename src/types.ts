/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProvenanceRecord {
  id: string;
  year: string;
  era: string;
  event: string;
  location: string;
  description: string;
  curatorNote?: string;
}

export interface SpecificationItem {
  id: string;
  label: string;
  value: string;
  scientificNotation?: string;
  importance: 'critical' | 'standard' | 'microscopic';
}

export enum ExhibitionSection {
  UNVEILING = 'unveiling',
  PROVENANCE = 'provenance',
  ANATOMY = 'anatomy',
  ACQUISITION = 'acquisition'
}

export interface NavigationItem {
  id: ExhibitionSection;
  label: string;
  serialNumber: string;
  description: string;
}

export interface InquiryFormState {
  fullName: string;
  email: string;
  institution: string;
  intendedDisplay: string;
  message: string;
  acknowledgement: boolean;
}

export interface AudioState {
  isPlaying: boolean;
  volume: number;
}
