"use client";

import {PieChart, Pie, Cell, ResponsiveContainer} from "recharts";
import {formatIdr} from "@/utils/formatter.utils";
import {Col, Text} from "@/components/atoms";

interface ReportItem {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface Props {
  data: ReportItem[];
}

export default function ReportChart({data}: Props) {
  return (
    <Col className="py-4 px-8">
      {/* Chart */}
      <div className="w-full h-64 outline-none focus:outline-none">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              cornerRadius={6}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-sm"
                style={{background: item.color}}
              />
              <Text>{item.name}</Text>
            </div>

            <div className="text-right">
              <Text weight="semibold">{item.percentage}%</Text>
              <Text size="10px" color="base-60">
                {formatIdr(item.value)}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Col>
  );
}
