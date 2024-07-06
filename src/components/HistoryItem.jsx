import PropType from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
export const HistoryItem = (props) => {
  return (
    <div>
      <div className="rounded-md p-4 bg-slate-50 flex justify-between items-center">
        <div className="flex flex-col justify-center">
          <span className="text-muted-foreground text-sm">
            {props.transactionDate}
          </span>
          <span className="text-muted-foreground font-semibold">
            INV-{props.id}
          </span>
        </div>
        <div className="flex flex-col justify-center items-end">
          <span className="font-bold text-2xl">
            Rp. {(props.totalPrice + props.tax).toLocaleString("id-ID")}
          </span>
          <Link to={"/history/" + props.id}>
            <Button variant="link">View detail</Button>
          </Link>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>TotalPrice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.items.map((cartItem) => {
            return (
              <TableRow
                className="text-muted-foreground font-semibold"
                key={cartItem.id}
              >
                <TableCell colSpan={2}>
                  <div className="flex items-center gap-6">
                    <div className="aspect-square w-[100px] overflow-hidden rounded-md">
                      <img
                        src={cartItem.product.image}
                        alt={cartItem.product.name}
                      />
                    </div>
                    <p className="font-semibold text-primary">
                      {cartItem.product.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  Rp {cartItem.product.price.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>{cartItem.quantity}</TableCell>
                <TableCell>
                  Rp{" "}
                  {(cartItem.product.price * cartItem.quantity).toLocaleString(
                    "id-ID"
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

HistoryItem.propTypes = {
  transactionDate: PropType.string,
  id: PropType.oneOfType(PropType.string, PropType.number),
  totalPrice: PropType.number,
  tax: PropType.number,
  items: PropType.array,
};
