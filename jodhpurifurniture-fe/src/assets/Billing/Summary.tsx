import { selectCartWithoutLogin } from "@/service/cart";

import Link from "next/link";

import { useSelector } from "react-redux";

export const Summary = () => {
  const cartITem = useSelector(selectCartWithoutLogin);

  return (
    <div
      style={{
        border: "1px solid #E5E5E5",
        maxHeight: 400,
        overflow: "auto",
        padding: "0px 16px  16px",
        marginTop: 20,
        marginBottom: 30,
      }}
    >
      {cartITem?.length &&
        cartITem?.map(function pCart(val, index) {
          return (
            <Link href={`/${val.slug_key}`}>
              <div style={{ display: "flex", gap: 15, marginTop: 15 }}>
                <img style={{ width: 130, height: 100 }} src={val.base_image} alt={val.product_name} title={val.product_name}/>
                <div style={{ marginTop: 2 }}>
                  <p className="font-16056 jost fw-500 color-22222 mb-0">
                    {val.product_name}{" "}
                  </p>
                  {val.sku && (
                    <label
                      style={{ marginTop: 5 }}
                      className="font-13 color-767676 jost fw-normal"
                    >
                      SKU: {val.sku}
                    </label>
                  )}
                  <label
                    style={{ marginTop: 5 }}
                    className="font-13 color-767676 jost fw-500"
                  >
                    Quantity: {val.qty}
                  </label>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};
