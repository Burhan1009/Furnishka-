import MetaContent from "@/assets/global/MetaContent";
import { selectallcategory } from "@/service/auth/globalstate";
import { useSelector } from "react-redux";
import DiningTable from "@/assets/MetaContents/DinigTable";
import SofaSet from "@/assets/MetaContents/SofaSet";
import StudyTable from "@/assets/MetaContents/StudyTable";
import DressingTable from "@/assets/MetaContents/DressingTable";
import ConsoleTable from "@/assets/MetaContents/ConsoleTable";
import ShoeRackes from "@/assets/MetaContents/ShoeRackes";
import TVunits from "@/assets/MetaContents/TVunits";
import SwingJhula from "@/assets/MetaContents/SwingJhula";
import KingBed from "@/assets/MetaContents/KingBed";

const MetaCommonFooter = () => {
  const otherAllCategory = useSelector(selectallcategory);
  return (
    <>
      {otherAllCategory[0]?.category_name == "Wooden Sofa Sets" ? (
        <SofaSet />
      ) : otherAllCategory[0]?.category_name == "King Size Beds" ? (
        <KingBed />
      ) : otherAllCategory[0]?.category_name == "Study Tables" ? (
        <StudyTable />
      ) : otherAllCategory[0]?.category_name == "Dressing Table" ? (
        <DressingTable />
      ) : otherAllCategory[0]?.category_name == "Console Table" ? (
        <ConsoleTable />
      ) : otherAllCategory[0]?.category_name == "Shoe Racks" ? (
        <ShoeRackes />
      ) : otherAllCategory[0]?.category_name == "Tv Units" ? (
        <TVunits />
      ) : otherAllCategory[0]?.category_name == "Wooden Jhula" ? (
        <SwingJhula />
      ) : otherAllCategory[0]?.category_name == "Dining Tables" ||
        otherAllCategory[0]?.category_name == "6 Seater Dining Sets" ||
        otherAllCategory[0]?.category_name == "4 Seater Dining Sets" ||
        otherAllCategory[0]?.category_name == "Round Dining Sets" ||
        otherAllCategory[0]?.category_name == "8 Seater Dining Sets" ||
        otherAllCategory[0]?.category_name == "Dining Storage" ? (
        <DiningTable />
      ) : (
        <MetaContent />
      )}
    </>
  );
};
export default MetaCommonFooter;
