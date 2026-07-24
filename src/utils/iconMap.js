import { FaDraftingCompass, FaBuilding, FaHammer, FaTools } from "react-icons/fa";

export const ICON_MAP = {
  FaDraftingCompass,
  FaBuilding,
  FaHammer,
  FaTools,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP);

export function getIcon(name) {
  return ICON_MAP[name] || FaBuilding;
}