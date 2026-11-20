"use client";
import { Breadcrumb, BreadcrumbItem } from "@carbon/react"; // Carbon component

export default function Crumbs({ group, name }) {
  return (
    <Breadcrumb noTrailingSlash>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      {group && <BreadcrumbItem href={`/#${group.id}`}>{group.title}</BreadcrumbItem>}
      <BreadcrumbItem isCurrentPage>{name}</BreadcrumbItem>
    </Breadcrumb>
  );
}
