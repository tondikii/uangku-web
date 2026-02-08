import {Col, Grid, Icon, Text} from "@/components/atoms";
import {BOTTOM_NAVIGATION_ITEMS} from "@/constants/navigation.constants";
import type {FC} from "react";
import {NavLink, useMatch} from "react-router";

const BottomNavbar: FC = () => {
  const isTransactionsActive = useMatch("/");
  const isCreateTransactionActive = useMatch("/create");

  return (
    <Col className="navbar bg-base-100 border-t border-base-300 p-0 h-20 shadow-lg shrink-0">
      <Grid
        direction="cols"
        className="place-items-center w-full h-full"
        num={4}
      >
        {BOTTOM_NAVIGATION_ITEMS.map((menu) => {
          const customActive =
            menu.name === "Transactions"
              ? Boolean(isTransactionsActive || isCreateTransactionActive)
              : undefined;

          return (
            <NavLink
              to={menu.to}
              key={menu.name}
              end={menu.end}
              className={({isActive}) => {
                const active = customActive ?? isActive;

                return `
                  flex flex-col items-center justify-center w-full h-full 
                  transition-all duration-300 relative
                  ${
                    active
                      ? "text-primary"
                      : "text-base-content/50 hover:text-base-content"
                  }
                `;
              }}
            >
              {({isActive}) => {
                const active = customActive ?? isActive;

                return (
                  <Col className="items-center">
                    {active && (
                      <Col className="absolute top-0 w-12 h-1 bg-primary rounded-b-full shadow-[0_2px_10px_rgba(146,227,169,0.5)]" />
                    )}

                    <Col
                      className={`
                        p-2 rounded-xl transition-colors
                        ${active ? "bg-primary/10" : "bg-transparent"}
                      `}
                    >
                      <Icon
                        name={menu.icon}
                        size={active ? 24 : 20}
                        className="transition-all"
                      />
                    </Col>

                    <Text
                      size="10px"
                      weight="semibold"
                      color={active ? "primary" : "base-60"}
                      className={`mt-1 tracking-wide ${active ? "opacity-100" : "opacity-70"}`}
                    >
                      {menu.name}
                    </Text>
                  </Col>
                );
              }}
            </NavLink>
          );
        })}
      </Grid>
    </Col>
  );
};

export default BottomNavbar;
