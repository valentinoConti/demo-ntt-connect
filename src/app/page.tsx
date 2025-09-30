"use client";

import dynamic from "next/dynamic";
import { type config } from "@wormhole-foundation/wormhole-connect";
import { nttRoutes } from "@wormhole-foundation/wormhole-connect/ntt";

// Dynamically import WormholeConnect to avoid SSR issues
const WormholeConnect = dynamic(
  () =>
    import("@wormhole-foundation/wormhole-connect").catch((error) => {
      console.error("Failed to load Wormhole Connect:", error);
      return {
        default: () => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px",
              fontSize: "18px",
              color: "#ff6b6b",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <div>
              <div>Failed to load Wormhole Connect</div>
              <div
                style={{ fontSize: "14px", marginTop: "10px", opacity: 0.8 }}
              >
                This may be due to browser compatibility issues. Check the
                browser console for details.
              </div>
            </div>
          </div>
        ),
      };
    }),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
          fontSize: "18px",
          color: "#78c4b6",
        }}
      >
        Loading Wormhole Connect...
      </div>
    ),
  }
);

function getWormholeConfig(): config.WormholeConnectConfig {
  return {
    network: "Mainnet",
    chains: ["Solana", "Ethereum"],
    tokens: ["W"],
    ui: {
      title: "Connect example",
    },
    routes: [
      ...nttRoutes({
        tokens: {
          W: [
            {
              chain: "Solana",
              manager: "NTtAaoDJhkeHeaVUHnyhwbPNAN6WgBpHkHBTc6d7vLK",
              token: "85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ",
              transceiver: [
                {
                  address: "NTtAaoDJhkeHeaVUHnyhwbPNAN6WgBpHkHBTc6d7vLK",
                  type: "wormhole",
                },
              ],
              quoter: "Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ",
            },
            {
              chain: "Ethereum",
              manager: "0xc072B1AEf336eDde59A049699Ef4e8Fa9D594A48",
              token: "0xB0fFa8000886e57F86dd5264b9582b2Ad87b2b91",
              transceiver: [
                {
                  address: "0xDb55492d7190D1baE8ACbE03911C4E3E7426870c",
                  type: "wormhole",
                },
              ],
            },
          ],
        },
      }),
    ],
    tokensConfig: {
      Wsolana: {
        symbol: "W",
        tokenId: {
          chain: "Solana",
          address: "85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ",
        },
        icon: "https://assets.coingecko.com/coins/images/35087/standard/womrhole_logo_full_color_rgb_2000px_72ppi_fb766ac85a.png?1708688954",
        decimals: 6,
      },
      Wethereum: {
        symbol: "W",
        tokenId: {
          chain: "Ethereum",
          address: "0xB0fFa8000886e57F86dd5264b9582b2Ad87b2b91",
        },
        icon: "https://assets.coingecko.com/coins/images/35087/standard/womrhole_logo_full_color_rgb_2000px_72ppi_fb766ac85a.png?1708688954",
        decimals: 18,
      },
    },
  };
}

export default function Home() {
  const wormholeConfig = getWormholeConfig();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <ErrorBoundary>
          <WormholeConnect
            config={wormholeConfig}
            theme={{ mode: "dark", primary: "#78c4b6" }}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}

// Simple error boundary component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
