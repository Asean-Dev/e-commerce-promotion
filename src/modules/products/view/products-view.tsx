"use client";

import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,
  Chip,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "hooks/use-redux";
import { MainContainer } from "modules/components";
import React, { use, useCallback, useEffect } from "react";
import { DATA_CATEGORIES } from "store/_mock/products";
import * as Action from "store/actions";
import { ProductCard } from "../product-card";
import { ProductFilterResult } from "../product-filter-result";
import { ProductFiltersBlock } from "../product-filters-block";

//------------------------------------------------------

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.text.primary, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.text.disabled, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

//-----------------------------------------------------

export function ProductsView() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const [category, setCategory] = React.useState("");
  const [search, setSearch] = React.useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleReset = useCallback(() => {
    setSearch("");
    setCategory("");
  }, [setSearch, setCategory]);

  useEffect(() => {
    dispatch(
      Action.fetchAllProcut({
        categoryId: category,
        search: search,
      })
    );
  }, [dispatch, category, search]);

  const hasValue = !!category || !!search;

  return (
    <MainContainer>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Typography variant="h6" width={1} fontWeight={800}>
          Products
        </Typography>
        <Stack width={1} direction={"row"} spacing={2}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={search}
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Search>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="catergory"
              onChange={handleChange}
            >
              {DATA_CATEGORIES.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      <ProductFilterResult
        onReset={handleReset}
        isShow={hasValue}
        sx={{ mb: 2 }}
      >
        <ProductFiltersBlock isShow={!!search}>
          <Chip
            variant={"filled"}
            color={"primary"}
            label={`Search : ${search}`}
            onDelete={() => setSearch("")}
          />
        </ProductFiltersBlock>
        <ProductFiltersBlock isShow={!!category}>
          <Chip
            variant={"filled"}
            color={"primary"}
            label={`Category : ${
              DATA_CATEGORIES.find((cat) => cat.id === category)?.name
            }`}
            onDelete={() => setCategory("")}
          />
        </ProductFiltersBlock>
      </ProductFilterResult>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 3, sm: 12, md: 12 }}
        justifyContent={"flex-start"}
      >
        {products.map((item) => (
          <Grid
            key={item.id}
            size={{ xs: 3, sm: 6, md: 4, lg: 3 }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ProductCard product={item} />
          </Grid>
        ))}
      </Grid>
    </MainContainer>
  );
}
