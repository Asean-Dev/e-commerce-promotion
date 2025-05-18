import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Popover,
  Stack,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { usePopover } from "hooks/use-popover";
import { useEffect, useState } from "react";
import { CampaignType } from "utils/calculate-promotion/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
type Props = {
  campaigns: CampaignType[];
  setMyCampaigns: React.Dispatch<
    React.SetStateAction<CampaignType[] | undefined>
  >;
};

export function CouponCard({ campaigns, setMyCampaigns }: Props) {
  const filterOntop = campaigns.filter(
    (e) => e.type === "OnTopCategory" || e.type === "OnTopPoints"
  );
  const popover = usePopover();

  const defualtValue = filterOntop.find((e) => e.type === "OnTopCategory");

  const [value, setValue] = useState<string>(
    defualtValue?.id || filterOntop[0].id
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType = event.target.value;
    setValue(selectedType);

    const useCoupon = filterOntop.find((e) => e.id === selectedType);

    setMyCampaigns((prev: CampaignType[] | undefined) => {
      if (!useCoupon) return prev ?? [];

      const safePrev = prev ?? [];

      const filtered = safePrev.filter(
        (c) => c.type !== "OnTopCategory" && c.type !== "OnTopPoints"
      );
      return [...filtered, useCoupon];
    });
  };

  useEffect(() => {
    const useCoupon = filterOntop.find((e) => e.id === value);
    setMyCampaigns((prev: CampaignType[] | undefined) => {
      if (!useCoupon) return prev ?? [];
      const safePrev = prev ?? [];
      const filtered = safePrev.filter(
        (c) => c.type !== "OnTopCategory" && c.type !== "OnTopPoints"
      );
      return [...filtered, useCoupon];
    });
  }, [value]);

  return (
    <Stack>
      <Box
        sx={{
          border: (theme) => `1px dashed ${theme.palette.divider}`,
          p: 1,
          borderRadius: "8px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={popover.onOpen}
      >
        {/* { item.type == "OnTopPoints"
                      ? "Redeem your points for extra discount"
                      : `Extra ${item.parameters.percentage}% off on ${item.parameters.category}} */}
        <motion.div
          animate={{ rotate: popover.open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: "inline-block" }}
        >
          <ExpandMoreIcon />
        </motion.div>
      </Box>
      <Popover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Card
          sx={{
            p: 2,
          }}
        >
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              On-Top Coupon
            </FormLabel>
            {filterOntop.map((item, index) => (
              <RadioGroup
                key={index}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={item.id}
                  control={<Radio />}
                  label={
                    item.type == "OnTopPoints"
                      ? "Redeem your points for extra discount"
                      : `Extra ${item.parameters.percentage}% off on ${item.parameters.category}`
                  }
                />
              </RadioGroup>
            ))}
          </FormControl>
        </Card>
      </Popover>
    </Stack>
  );
}
