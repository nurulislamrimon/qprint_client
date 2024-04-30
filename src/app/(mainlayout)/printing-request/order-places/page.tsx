import OrderDetailsCard from "@/components/PrintingRequest/OrderDetailsCard";
import ThankYouOrderPlaces from "@/components/PrintingRequest/ThankYouOrderPlaces";
import NeedHelp from "@/components/UI/card/NeedHelp";

const OrderPlaces = () => {
  return (
    <section className="lg:max-w-[700px] w-full mx-auto  mb-7">
      <ThankYouOrderPlaces />
      <OrderDetailsCard />
      <NeedHelp />
    </section>
  );
};

export default OrderPlaces;
