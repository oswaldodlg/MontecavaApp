import React, {useState, useEffect} from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';



export default function ServicesTreeView({setCurrentServiceView}) {

  return (
    <>
    <TreeView
      aria-label="icon expansion"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ minHeight: 240, flexGrow: 1, maxWidth: 400, 
        }}
      onNodeSelect={(e, node) => {
        setCurrentServiceView(node)
      }}
    >
   
      <TreeItem 
      nodeId="Declaraciones" 
      label="Declaraciones"/>
      <TreeItem 
      nodeId="Folios" 
      label="Folios para facturar"/>
      <TreeItem 
      nodeId="Contabilidad" 
      label="Contabilidad Fiscal" 
      />
      <TreeItem nodeId="IMAFIN" 
      label="IMSS, AFORE, INFONAVIT" 
      />
      <TreeItem nodeId="Tesoreria" 
      label="Tesoreria NL" 
      />
      <TreeItem nodeId="EstadosFinancieros" 
      label="Estados Financieros" 
      />
       <TreeItem nodeId="TablerosControl" 
      label="Tableros de Control"
      />
      <TreeItem nodeId="Consultoria" 
      label="Consultoria"
      />
      <TreeItem nodeId="Seguro" 
      label="Seguro de Imprevistos SAT, IMSS, Tesoreria"
      />
      <TreeItem nodeId="Presentacion" 
      label="Presentación de Resultados en sala de juntas"
      />
    </TreeView>
    </>
  );
}
